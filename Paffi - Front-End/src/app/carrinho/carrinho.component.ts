import { ConfirmationService } from 'primeng/api';
import { CarrinhoService } from './carrinho.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  public produtos: any[] = [];
  public display = false;

  constructor(
    public carrinhoS: CarrinhoService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.carrinhoS.produtos.subscribe(produtos => {
      this.produtos = produtos;
    });
  }

  realizaCompra() {
    this.display = false;
    console.log(this.produtos);
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
