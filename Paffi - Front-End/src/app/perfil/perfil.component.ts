import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  // Formulários
  public formularioUsuario: FormGroup;
  // Formularios

  // Variaveis
  public usuario: any[] = [];
  // Variaveis

  constructor(
    private AuthS: AuthService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.AuthS.pegaUsuarioAtual().then(dado => {
      if (dado) {

        this.http
          .post('http://localhost:3000/pegaUsuario',
            // tslint:disable-next-line: no-shadowed-variable
            { id: this.AuthS.pegaIdUsuario() }).subscribe((dado: any) => {
              this.usuario = dado;

              this.formularioUsuario = this.formBuilder.group({
                nome: '',
                photoURL: '',
                descricao: ''
              });
            });
        // Formulário de edição de perfil


        //         // Busca produtos da loja
        //         this.http
        //           .post('http://localhost:3000/buscaLojaProduto', {
        //             id: this.loja.id_loja
        //           })
        //           .subscribe(prod => {
        //             this.produtos = prod;
        //             this.loading = false;
        //             console.log(this.produtos);
        //           });
        //       });
        //   } else {
        //     // Se não tiver, esconde o conteúdo da página e manda pra tela de login
        //     this.mostraConteudo = false;
        //     this.router.navigate(['']);
        //   }
        // });
      }

    });
  }
}
