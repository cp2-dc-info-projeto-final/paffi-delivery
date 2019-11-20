import { AuthService } from './../auth.service';
import { Component, OnInit, NgZone } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

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
    private firebase: AngularFirestore) { }

  ngOnInit() {

    // Verifica se o usuário está logado
    this.AuthS.pegaUsuarioAtual().then((dado) => {
      if (dado) {
        this.router.navigate(['home']);
      }
    });

    // Opções da caixa de seleção
    this.opcoes = [
      { label: 'Deseja Vender?', value: null },
      { label: 'Sim', value: true },
      { label: 'Não', value: false },
    ];

    // Construção do formulário de cadastro
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

  // Verifica se o usuário marcou que deseja vender
  verificaVendedor() {
    if (this.formularioCadastro.value.vender === true) {
      this.venda = true;
    } else {
      this.venda = false;
    }
  }

  // Verifica se os dados estão corretos e efetua o cadastro
  cadastrar() {
    if (!this.formularioCadastro.valid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Dados inválidos',
        detail: 'Verifique os dados e tente novamente'
      });
    } else {

      // Verifica se email e confirmar email  / Senha e confirmar senha estão corretos
      if ((this.formularioCadastro.value.email === this.formularioCadastro.value.confEmail)
        && (this.formularioCadastro.value.senha === this.formularioCadastro.value.confSenha)) {
        // Chama a função de cadastrar usuário no banco de dados
        this.AuthS.cadastraUsuario(this.formularioCadastro.value.email, this.formularioCadastro.value.senha)
          .then(() => {
            // Coloca um nome padrão pra loja se o usuário não informar
            if (this.formularioCadastro.value.nomeLoja == null) {
              this.formularioCadastro.patchValue({ nomeLoja: 'Minha Loja' });
              this.http.post('http://localhost:3000/cadastraUsuario',
                {
                  email: this.formularioCadastro.value.email, senha: this.formularioCadastro.value.senha,
                  uid: this.AuthS.pegaIdUsuario(), loja: this.formularioCadastro.value.vender,
                  nomeloja: this.formularioCadastro.value.nomeLoja, descricao: 'Essa é a minha Loja! Aproveite!',
                  url: 'https://firebasestorage.googleapis.com/v0/b/' +
                    'paffi-tcc.appspot.com/o/bg.jpg?alt=media&token=d79c25fe-35ca-4df2-9986-f2f8696809b0',
                  nome: (this.formularioCadastro.value.nome + ' ' + this.formularioCadastro.value.sobrenome)
                })
                .subscribe((dado: any) => {
                  if (this.formularioCadastro.value.vender) {
                    this.firebase.collection('Lojas').doc(dado.rs.toString()).set({
                      timestamp: 0
                    });
                  }
                  this.router.navigate(['home']);
                });
            } else {
              this.http.post('http://localhost:3000/cadastraUsuario',
                {
                  email: this.formularioCadastro.value.email, senha: this.formularioCadastro.value.senha,
                  uid: this.AuthS.pegaIdUsuario(), loja: this.formularioCadastro.value.vender,
                  nomeloja: this.formularioCadastro.value.nomeLoja, descricao: 'Essa é a minha Loja! Aproveite!',
                  url: 'https://firebasestorage.googleapis.com/v0/b/' +
                    'paffi-tcc.appspot.com/o/bg.jpg?alt=media&token=d79c25fe-35ca-4df2-9986-f2f8696809b0',
                  nome: (this.formularioCadastro.value.nome + ' ' + this.formularioCadastro.value.sobrenome)
                })
                .subscribe((dado: any) => {
                  if (this.formularioCadastro.value.vender) {
                    this.firebase.collection('Lojas').doc(dado.rs.toString()).set({
                      timestamp: 0
                    });
                  }
                  this.router.navigate(['home']);
                });
            }
          }) // Trata os Erros (Email em uso, Senha fraca, Confirmação de senha/email e dados inválidos)
          .catch((err) => {
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
                summary: 'Dados inválidos',
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
}

