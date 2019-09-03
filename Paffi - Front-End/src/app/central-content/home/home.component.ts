import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

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
    this.http.post('http://localhost:3000/pegaLojas', {})
      .subscribe((dado: any[]) => {
        this.Stores = dado;
      });
    this.AuthS.estaLogado.subscribe(dado => {
      if (!dado) {
        this.mostraConteudo = false;
        this.router.navigate(['']);
      } else {
        this.mostraConteudo = true;
      }
    });

  }
}
