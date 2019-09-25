import { AuthService } from './../auth.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public formularioLogin: FormGroup;
  public formularioRSenha: FormGroup;
  display: boolean;

  constructor(
    private AuthS: AuthService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private ngZone: NgZone) { }

  ngOnInit() {
    // verifica se o usuário está logado
    this.AuthS.pegaUsuarioAtual().then((dado) => {
      if (dado) {
        this.router.navigate(['home']);
      }
    });

    // Monta a estrutura do formulário de redefinição de senha
    this.formularioRSenha = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });

    // Monta a estrutura do formulário de login
    this.formularioLogin = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required],
    });
  }

  // Executa o login
  logar() {

    // Verifica se o formulário está inválido
    if (!this.formularioLogin.valid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Dados inválidos',
        detail: 'Verifique os dados e tente novamente'
      });
    } else {
      const email = this.formularioLogin.value.email;
      const senha = this.formularioLogin.value.senha;

      // Executa a função de login
      this.AuthS.fazLogin(email, senha).then(() => {
        this.router.navigate(['home']);
      }) // Trata erros do login(Senha Errada, Usuário não encontrado, Dados inválidos)
        .catch((err) => {
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
    }
  }

  // Redireciona para a página de cadastro
  redirecionaCadastro() {
    this.router.navigate(['cadastro']);
  }

  // Abre Redefinição de senha
  abreRedefineSenha() {
    this.display = true;
  }

  RedefineSenha() {
    if (this.formularioRSenha.valid) {
      this.AuthS.enviaRedefinicaoSenha(this.formularioRSenha.value.email);
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro nos dados inseridos.',
        detail: 'Verifique novamente seus dados.'
      });
    }
  }
}
