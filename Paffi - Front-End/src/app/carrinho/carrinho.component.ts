import { CarrinhoService } from './carrinho.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  public produtos: any[] = [];
  constructor(
    private carrinhoS: CarrinhoService) { }

  ngOnInit() {
    this.carrinhoS.produtos.subscribe(produtos => {
      this.produtos = produtos
    })
  }

}
