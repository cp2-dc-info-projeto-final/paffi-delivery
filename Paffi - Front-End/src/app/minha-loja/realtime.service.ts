import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {



  constructor(
    private fire: AngularFirestore,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private http: HttpClient) { }

  public nPedidos = 0;
  public realtime: any;
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
