import { HttpClient } from '@angular/common/http';
import { RealtimeService } from './minha-loja/realtime.service';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Paffi Delivery';
  showNav = false;
  constructor(
    private AuthS: AuthService,
    public realtime: RealtimeService,
    private http: HttpClient) {
    this.AuthS.showNav.subscribe((dado) => {
      if (dado) {
        this.showNav = true;
        this.http
          .post('http://localhost:3000/buscaMinhaLoja', {
            uid: this.AuthS.pegaIdUsuario()
          }).subscribe((loja: any) => {
            if (loja) {
              this.realtime.iniciaRealTime(loja.id_loja);
            }
          });
      } else {
        this.showNav = false;
      }
    });
  }
}
