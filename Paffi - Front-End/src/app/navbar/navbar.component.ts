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

  constructor(
    private router: Router,
    private authS: AuthService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() { }

  goTo(url) {
    console.log(url);
    this.router.navigate([url]);
  }

  sair() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja sair?',
      accept: () => {
        this.authS.fazLogOut();
        this.router.navigate(['']);
      }
    });

  }
}
