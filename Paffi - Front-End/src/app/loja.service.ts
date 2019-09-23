import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LojaService {

  public dadosLoja = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }
}
