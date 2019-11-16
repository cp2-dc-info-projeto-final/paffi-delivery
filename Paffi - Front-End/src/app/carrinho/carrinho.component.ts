import { HttpClient } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { CarrinhoService } from './carrinho.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

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
    private authS: AuthService) { }

  ngOnInit() {
    this.carrinhoS.produtos.subscribe(produtos => {
      this.produtos = produtos;
    });
  }

  realizaCompra() {
    if (this.selectedLocal) {
      this.confirmationService.confirm({
        message: 'A compra será entregue em: ' + this.selectedLocal + '. Deseja confirmar a compra?',
        accept: () => {
          this.http.post('http://localhost:3000/realizaCompra', {
            local: this.selectedLocal,
            produtos: this.produtos,
            loja: this.carrinhoS.nomeLoja,
            usuario: this.authS.pegaIdUsuario()
          }).subscribe(dado => {
            console.log(dado);
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
