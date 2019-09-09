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
  constructor(private AuthS: AuthService) {
    this.AuthS.pegaUsuarioAtual().then((dado) => {
      if (dado) {
        this.showNav = true;
      } else {
        this.showNav = false;
      }
    });
  }
}
