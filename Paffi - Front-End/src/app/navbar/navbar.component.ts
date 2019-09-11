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
    private authS: AuthService) { }

  ngOnInit() { }

  goTo(url) {
    console.log(url);
    this.router.navigate([url]);
  }

  sair() {
    this.authS.fazLogOut();
  }
}
