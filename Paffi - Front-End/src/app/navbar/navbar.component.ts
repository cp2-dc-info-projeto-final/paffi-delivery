import { RealtimeService } from './../minha-loja/realtime.service';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public vendedor;
  public sideNav;
  public sideNavMobileVendedor;
  public sideNavMobileNaoVendedor;
  public categorias = ['Salgados', 'Pizzas', 'Brownies',
    'Brigadeiros', 'Bolos', 'Empadão',
    'Sanduíches', 'Palhas', 'Trufas'];

  constructor(
    private router: Router,
    private authS: AuthService,
    private confirmationService: ConfirmationService,
    private realtime: RealtimeService) { }

  ngOnInit() {
    // Verifica se o usuário é vendedor ou não
    this.authS.vendedor.subscribe(dado => this.vendedor = dado);
  }

  // Botão para subir a página pro topo
  sobePagina() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // Navegação
  goTo(url) {
    console.log(url);
    this.router.navigate([url]);
  }

  // LogOut
  sair() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja sair?',
      accept: () => {
        // tslint:disable-next-line: no-unused-expression
        (this.realtime.subscription) ? this.realtime.subscription.unsubscribe() : null;
        this.authS.fazLogOut();
        this.router.navigate(['']);
      }
    });

  }
}
