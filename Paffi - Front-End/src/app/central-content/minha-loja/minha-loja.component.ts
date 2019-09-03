import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-minha-loja',
  templateUrl: './minha-loja.component.html',
  styleUrls: ['./minha-loja.component.css']
})
export class MinhaLojaComponent implements OnInit {
  public mostraConteudo = false;
  display = false;

  constructor(
    private AuthS: AuthService,
    private router: Router,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.AuthS.estaLogado.subscribe(dado => {
      if (!dado) {
        this.mostraConteudo = false;
        this.router.navigate(['']);
      } else {
        this.mostraConteudo = true;
      }
    });
  }
  showDialog() {
    this.display = true;
  }
}
