import { AuthService } from './../auth.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public formularioLogin: FormGroup;

  constructor(
    private AuthS: AuthService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private ngZone: NgZone) { }

  ngOnInit() {

    this.AuthS.pegaUsuarioAtual().then((dado) => {
      if (dado) {
        this.router.navigate(['home']);
      }
    });

    this.formularioLogin = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required],
    });
  }

  logar() {
    if (!this.formularioLogin.valid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Dados inválidos',
        detail: 'Verifique os dados e tente novamente'
      });
    } else {
      const email = this.formularioLogin.value.email;
      const senha = this.formularioLogin.value.senha;
      console.log(senha, email);
      this.AuthS.fazLogin(email, senha).then(() => {
        console.log('logado');
        this.router.navigate(['home']);
      }).catch((err) => {
        console.log(err);
        if (err.code === 'auth/wrong-password') {
          this.messageService.add({
            severity: 'warn',
            summary: 'Senha Incorreta',
            detail: 'Senha incorreta, tente novamente.'
          });
        } else if (err.code === 'auth/user-not-found') {
          this.messageService.add({
            severity: 'warn',
            summary: 'E-mail não encontrado',
            detail: 'Por favor verifique seu endereço de E-mail.'
          });
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Erro na autenticação',
            detail: 'Verifique novamente seus dados.'
          });

        }
      });

      // this.AuthS.fazLogin(email, senha).then(() => {
      //   console.log(this.AuthS.pegaUsuarioAtual());
      // });
    }
  }

  redirecionaCadastro() {
    this.router.navigate(['cadastro']);
  }
}
