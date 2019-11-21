import { RealtimeService } from './../minha-loja/realtime.service';
import { LojaService } from './../loja.service';
import { AuthService } from './../auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public mostraConteudo = false;
  public Stores: any[] = [];
  public id;
  public loading = false;

  constructor(
    private http: HttpClient,
    private AuthS: AuthService,
    private router: Router,
    private lojaS: LojaService,
    private fire: AngularFirestore,
    private realTime: RealtimeService) { }

  ngOnInit() {
    this.loading = true;
    // Verifica se está logado
    this.AuthS.pegaUsuarioAtual().then((dado) => {
      if (dado) {
        this.mostraConteudo = true;
        this.id = this.AuthS.pegaIdUsuario();
      } else {
        this.mostraConteudo = false;
        this.router.navigate(['']);
      }
    });
    // Pega todas as lojas
    this.http.post('http://localhost:3000/pegaLojas', {})
      .subscribe((dado: any[]) => {
        this.Stores = dado;
        this.loading = false;
      });
  }

  testeBD() {
    this.fire.collection('Lojas').add({ timestamp: 0 })
      .then(dado => console.log(dado))
      .catch(err => console.log(err));
  }

  // Entra na loja
  entraLoja(loja) {

    // Se a loja for sua redireciona pro seu perfil de loja
    if (loja.id_dono === this.id) {
      this.router.navigate(['minhaloja']);
    } else {
      this.lojaS.dadosLoja.next(loja);
      this.router.navigate(['loja']);
    }
  }
}
