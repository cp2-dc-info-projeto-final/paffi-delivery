import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {



  constructor(
    private fire: AngularFirestore,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private http: HttpClient,
    private authS: AuthService) { }

  public nPedidos = 0;
  public realtime: any;
  public realtimeUser: any;
  public subscription: Subscription;
  public iniciado = false;
  public display = false;
  private idLoja: any;
  public pedidos: any[] = [];
  public produtos: any[] = [];

  public iniciaRealTime(idloja) {
    console.log('iniciando real-time');
    // tslint:disable-next-line: prefer-const
    this.idLoja = idloja;
    if (!this.iniciado || !idloja) {
      this.iniciado = true;
      this.realtime = this.fire.collection('Lojas').doc(idloja.toString()).snapshotChanges();
      this.subscription = this.realtime.subscribe(dado => {
        this.http.post('http://localhost:3000/getPedidos', {
          id_loja: this.idLoja
        }).subscribe((pedido: any) => {
          this.nPedidos = pedido.length;
          console.log(pedido);
          this.pedidos = pedido;
          if (this.nPedidos !== 0) {
            this.confirmationService.confirm({
              header: 'Pedidos em andamento',
              message: 'Você tem pedidos em andamento. Deseja conferir?',
              accept: () => {
                this.mostraPedidos();
              }
            });

          }
        });

      });
    }
  }

  public iniciaRealtimeUser() {
    console.log('inicia user');
    this.realtimeUser = this.fire.collection('Users').doc(this.authS.pegaIdUsuario()).snapshotChanges();
    let count = 0;
    this.realtimeUser.subscribe((dado) => {
      console.log('inicia user 2');
      if (count > 0) {
        this.confirmationService.confirm({
          acceptLabel: 'Ok.',
          header: 'Compra cancelada.',
          message: 'Sua compra foi cancelada.',
          icon: 'pi pi-shopping-cart',
          accept: () => {

          }
        });
      }
      count++;
    });
  }

  public visualizaProduto(id) {
    this.http.post('http://localhost:3000/pegaProdutoHistorico', {
      id_compra: id
    }).subscribe((produtos: any) => {
      let mensagem = '';
      produtos.forEach(produto => {
        mensagem += '<h5>1x ' + produto.nome + ' - Valor: R$' + produto.valor + '</h5>';
      });
      this.confirmationService.confirm({
        acceptVisible: false,
        rejectVisible: false,
        header: 'Produtos',
        message: mensagem,
        icon: 'pi pi-shopping-cart',
        accept: () => {

        }
      });
    });
  }

  public finalizarPedido(pedidoc) {
    this.confirmationService.confirm({
      header: 'Pedido Entregue',
      message: 'Deseja finalizar esse pedido?',
      accept: () => {
        this.http.post('http://localhost:3000/finalizaPedido', {
          id_compra: pedidoc.id_compra
        }).subscribe(dado => {
          this.http.post('http://localhost:3000/getPedidos', {
            id_loja: this.idLoja
          }).subscribe((pedido: any) => {
            this.nPedidos = pedido.length;
            this.pedidos = pedido;
          });
        });
      }
    });
  }

  public cancelarPedido(pedidoc) {
    this.confirmationService.confirm({
      header: 'Pedido Cancelado',
      message: 'Deseja cancelar esse pedido?',
      accept: () => {
        this.http.post('http://localhost:3000/cancelaPedido', {
          id_compra: pedidoc.id_compra
        }).subscribe(dado => {
          this.fire.collection('Users').doc(pedidoc.id_usuario).update({ timestamp: moment().unix() });
          this.http.post('http://localhost:3000/getPedidos', {
            id_loja: this.idLoja
          }).subscribe((pedido: any) => {
            this.nPedidos = pedido.length;
            this.pedidos = pedido;
          });
        });
      }
    });
  }


  public mostraPedidos() {
    this.display = true;
  }
}
