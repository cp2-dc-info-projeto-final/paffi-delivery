import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.css']
})
export class HttpComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  sendHttp() {
    return this.http.post('https://paffitcc.herokuapp.com/teste',
      { email: 'theovini@yahoo.com.br', senha: '213123' }).subscribe(dado => console.log(dado));
  }
}
