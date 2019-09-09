import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-minha-loja',
  templateUrl: './minha-loja.component.html',
  styleUrls: ['./minha-loja.component.css']
})
export class MinhaLojaComponent implements OnInit {
  public salvar = true;
  public mostraConteudo = false;
  public modoEditar = false;
  public display = false;
  public loja: any = {};
  public formularioLoja: FormGroup;

  constructor(
    private AuthS: AuthService,
    private router: Router,
    private ngZone: NgZone,
    private http: HttpClient,
    private storage: AngularFireStorage,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    ) { }

  ngOnInit() {
    this.modoEditar = false;
    this.AuthS.pegaUsuarioAtual().then((dado) => {
      if (dado) {
        this.http.post('http://localhost:3000/buscaMinhaLoja',
          { uid: this.AuthS.pegaIdUsuario() })
          .subscribe((loja: any[]) => {
            this.loja = loja;
            this.mostraConteudo = true;
            this.formularioLoja = this.formBuilder.group({
              nome: this.loja.nome_loja,
              photoURL: this.loja.photoURL,
              descricao: this.loja.descricao,
            });
          });
      } else {
        this.mostraConteudo = false;
        this.router.navigate(['']);
      }
    });
  }

  showDialog() {
    this.display = true;
  }

  go() {
    this.router.navigate(['home']);
  }

  uploadFile(event) {
    this.messageService.add({
      severity: 'info',
      summary: 'Salvando foto',
      detail: 'Espere até a foto salvar para salvar as mudanças no perfil'
    });
    this.salvar = false;
    const user = this.AuthS.pegaIdUsuario();
    const file = event.target.files[0];
    const filePath = user + '/loja';
    const ref = this.storage.ref(filePath);
    const task = ref.put(file).then((dado) => {
      ref.getDownloadURL().subscribe(foto => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'A foto foi salva!'
        });
        this.formularioLoja.patchValue({ photoURL: foto });
        this.salvar = true;
      });
    }).catch((err) => console.log(err));
  }

  ativaModoEditar() {
    (this.modoEditar) ? this.modoEditar = false : this.modoEditar = true;
  }

  atualizaLoja() {
    this.http.post('http://localhost:3000/atualizaLoja', {
      nome: this.formularioLoja.value.nome, url: this.formularioLoja.value.photoURL,
      descricao: this.formularioLoja.value.descricao, uid: this.AuthS.pegaIdUsuario()
    }).subscribe(dado => {
      this.http.post('http://localhost:3000/buscaMinhaLoja',
        { uid: this.AuthS.pegaIdUsuario() })
        .subscribe((loja: any[]) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Dados Alterados',
            detail: 'Perfil alterado com sucesso!'
          });
          this.loja = loja;
          this.mostraConteudo = true;
          this.formularioLoja = this.formBuilder.group({
            nome: this.loja.nome_loja,
            photoURL: this.loja.photoURL,
            descricao: this.loja.descricao,
          });
        });
    });

  }

  sair() {
    this.AuthS.fazLogOut();
  }
}
