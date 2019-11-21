import { HttpClient } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { CarrinhoService } from './carrinho.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as moment from 'moment';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  public produtos: any[] = [];
  public display = false;
  public locais = [{ label: 'Selecione o local', value: null },
  { label: 'Sala x', value: 'Sala x' },
  { label: 'Auditório', value: 'Auditório' }];
  public selectedLocal = '';

  constructor(
    public carrinhoS: CarrinhoService,
    private confirmationService: ConfirmationService,
    private http: HttpClient,
    private authS: AuthService,
    private fire: AngularFirestore) { }

  ngOnInit() {
    this.carrinhoS.produtos.subscribe(produtos => {
      this.produtos = produtos;
    });
  }

  realizaCompra() {
    console.log(this.produtos[0].id_loja);
    if (this.selectedLocal) {
      this.confirmationService.confirm({
        message: 'A compra será entregue em: ' + this.selectedLocal + '. Deseja confirmar a compra?',
        accept: () => {
          this.http.post('http://localhost:3000/realizaCompra', {
            local: this.selectedLocal,
            produtos: this.produtos,
            loja: this.produtos[0].id_loja,
            usuario: this.authS.pegaIdUsuario(),
            datahora: {
              data: moment().format('DD/MM/YYYY'),
              hora: moment().unix()
            }
          }).subscribe((dado: any) => {
            // tslint:disable-next-line: triple-equals
            if (dado.success == true) {
              this.fire.collection('Lojas').doc(this.produtos[0].id_loja.toString()).update({timestamp: moment().unix()});
              this.produtos = [];
              this.display = false;
              this.selectedLocal = '';
              this.carrinhoS.limpaCarrinho();
            } else {
              this.confirmationService.confirm({
                message: 'Ocorreu um Erro na sua compra, por favor, tente novamente.',
              });
            }
          });
        }
      });
    } else {
      this.confirmationService.confirm({
        message: 'Um local precisa estar selecionado para realizar a compra. Deseja seleciona-lo?',
      });
    }

  }

  excluiProduto(index) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir esse produto do carrinho?',
      accept: () => {
        this.produtos.splice(index, 1);
        if (this.produtos.length === 0) {
          this.display = false;
        }
        this.carrinhoS.produtos.next(this.produtos);
      }
    });

  }

  showCarrinho() {
    this.display = true;
  }

}
