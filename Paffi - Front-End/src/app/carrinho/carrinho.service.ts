import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private listaProdutos: any[] = [];
  public produtos = new BehaviorSubject([]);

  constructor(
    private confirmationService: ConfirmationService
  ) { }

  addProduto(produto) {
    console.log(produto, '<=== produto')
    if (this.listaProdutos.length == 0) {
      this.listaProdutos.push(produto);
      console.log('listasProdutos IF1 ==> ', this.listaProdutos)
      this.produtos.next(this.listaProdutos);
    } else {
      if (this.listaProdutos[this.listaProdutos.length - 1].id_loja == produto.id_loja) {
        this.listaProdutos.push(produto);
        console.log('listasProdutos IF2 ==> ', this.listaProdutos)
        this.produtos.next(this.listaProdutos);
      } else {
        this.confirmationService.confirm({
          message: 'Você já tem itens de outra loja adicionados no seu carrinho, deseja limpar o seu carrinho?',
          accept: () => {
            this.listaProdutos = []
            this.listaProdutos.push(produto);
            console.log('Accept ==> ', this.listaProdutos)
            this.produtos.next(this.listaProdutos);
          }
      });
      }
    }
  }
}
