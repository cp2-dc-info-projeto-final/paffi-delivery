import { AuthService } from './../auth.service';
import { Component, OnInit, NgZone } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public formularioCadastro: FormGroup;
  public opcoes: any[] = [];
  public venda: any;
  constructor(
    private AuthS: AuthService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.AuthS.pegaUsuarioAtual().then((dado) => {
      if (dado) {
        this.router.navigate(['home']);
      }
    });

    this.opcoes = [
      { label: 'Deseja Vender?', value: null },
      { label: 'Sim', value: true },
      { label: 'Não', value: false },
    ];

    this.formularioCadastro = this.formBuilder.group({
      nome: [null, Validators.required],
      sobrenome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      confEmail: [null, Validators.required],
      senha: [null, Validators.required],
      confSenha: [null, Validators.required],
      vender: [null, Validators.required],
      nomeLoja: [null],
    });
  }

  verificaVendedor() {
    if (this.formularioCadastro.value.vender === true) {
      this.venda = true;
    } else {
      this.venda = false;
    }
  }

  cadastrar() {
    if (!this.formularioCadastro.valid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Dados inválidos',
        detail: 'Verifique os dados e tente novamente'
      });
    } else {
      if ((this.formularioCadastro.value.email === this.formularioCadastro.value.confEmail)
        && (this.formularioCadastro.value.senha === this.formularioCadastro.value.confSenha)) {
        this.AuthS.cadastraUsuario(this.formularioCadastro.value.email, this.formularioCadastro.value.senha)
          .then(() => {
            if (this.formularioCadastro.value.nomeLoja == null) {
              this.formularioCadastro.patchValue({ nomeLoja: 'Minha Loja' });
              this.http.post('http://localhost:3000/cadastraUsuario',
                {
                  email: this.formularioCadastro.value.email, senha: this.formularioCadastro.value.senha,
                  uid: this.AuthS.pegaIdUsuario(), loja: this.formularioCadastro.value.vender,
                  nomeloja: this.formularioCadastro.value.nomeLoja,
                  nome: (this.formularioCadastro.value.nome + ' ' + this.formularioCadastro.value.sobrenome)
                })
                .subscribe(dado => console.log(dado));
            } else {
              this.http.post('http://localhost:3000/cadastraUsuario',
                {
                  email: this.formularioCadastro.value.email, senha: this.formularioCadastro.value.senha,
                  uid: this.AuthS.pegaIdUsuario(), loja: this.formularioCadastro.value.vender,
                  nomeloja: this.formularioCadastro.value.nomeLoja,
                  nome: (this.formularioCadastro.value.nome + ' ' + this.formularioCadastro.value.sobrenome)
                })
                .subscribe(dado => console.log(dado));
            }
            console.log(this.formularioCadastro.value.nomeLoja);

          })
          .catch((err) => {
            console.log(err);
            if (err.code === 'auth/email-already-in-use') {
              this.messageService.add({
                severity: 'warn',
                summary: 'E-Mail já cadastrado',
                detail: 'Esse E-mail já está cadastrado.'
              });
            } else if (err.code === 'auth/weak-password') {
              this.messageService.add({
                severity: 'warn',
                summary: 'Senha fraca',
                detail: 'Senha fraca demais, utilize ao menos 6 caracteres.'
              });
            } else {
              this.messageService.add({
                severity: 'warn',
                summary: 'Confirmação de Senha incorreta',
                detail: 'Verifique os dados e tente novamente'
              });
            }
          });
      } else if ((this.formularioCadastro.value.email !== this.formularioCadastro.value.confEmail)) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Confirmação de E-mail incorreta',
          detail: 'Verifique os dados e tente novamente'
        });
      } else if (this.formularioCadastro.value.senha !== this.formularioCadastro.value.confSenha) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Confirmação de Senha incorreta',
          detail: 'Verifique os dados e tente novamente'
        });
      }
    }
  }
  myUploader(e) {
    console.log(e.files);
    this.http.post('http://localhost:3000/teste', { foto: e.files }).subscribe((dado) => console.log(dado));
  }
}

