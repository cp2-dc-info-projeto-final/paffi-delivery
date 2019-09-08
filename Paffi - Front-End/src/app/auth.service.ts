import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public usuario: any;
  constructor(private fire: AngularFireAuth) {
  }

  pegaUsuarioAtual() {
    return new Promise((resolve) => {
      this.fire.auth.onAuthStateChanged(user => {
        if (user) {
          resolve(user);
        } else {
          console.log(false);
          resolve(false);
        }
      });
    });
  }

  pegaIdUsuario() {
    return this.fire.auth.currentUser.uid;
  }

  fazLogin(email, senha) {
    return this.fire.auth.signInWithEmailAndPassword(email, senha);
  }

  fazLogOut() {
    this.fire.auth.signOut();
  }

  cadastraUsuario(email, senha) {
    return this.fire.auth.createUserWithEmailAndPassword(email, senha);
  }

}
