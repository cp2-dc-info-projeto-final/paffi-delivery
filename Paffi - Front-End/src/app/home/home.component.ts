import { AuthService } from './../auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public mostraConteudo = false;
  public Stores: any[] = [];

  constructor(
    private http: HttpClient,
    private AuthS: AuthService,
    private router: Router,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.AuthS.pegaUsuarioAtual().then((dado) => {
      if (dado) {
        this.mostraConteudo = true;
      } else {
        this.mostraConteudo = false;
        this.router.navigate(['']);
      }
    });

    this.http.post('http://localhost:3000/pegaLojas', {})
      .subscribe((dado: any[]) => {
        this.Stores = dado;
      });
    if (this.AuthS.pegaUsuarioAtual()) {
      this.mostraConteudo = true;
    } else {
      this.mostraConteudo = false;
      this.router.navigate(['']);
    }

  }
  go() {
    this.router.navigate(['minhaloja']);
  }
}
