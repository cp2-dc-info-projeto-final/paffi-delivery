import { AngularFireStorage } from '@angular/fire/storage';
import { MessageService } from 'primeng/components/common/messageservice';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as moment from 'moment';

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
  public usuario: any = {};
  public loading = true;
  public display = false;
  public config = false;
  public salvar = true;
  public historico: any[] = [];
  public displayProdutos = false;
  public produtos: any[]  = [];
  // Variaveis

  constructor(
    private AuthS: AuthService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private storage: AngularFireStorage,
    private router: Router) { }

  ngOnInit() {
    this.AuthS.pegaUsuarioAtual().then(dado => {
      if (dado) {

        this.http.post('http://localhost:3000/pegaUsuario',
          // tslint:disable-next-line: no-shadowed-variable
          {
            id: this.AuthS.pegaIdUsuario()
          })
          // tslint:disable-next-line: no-shadowed-variable
          .subscribe((dado: any) => {
            this.usuario = dado;
            this.formularioUsuario = this.formBuilder.group({
              nome: this.usuario.nome,
              photoURL: this.usuario.photoURL,
              email: this.usuario.email
            });
            this.loading = false;
            this.getHistorico();
          });
      } else {
        this.router.navigate(['']);
      }

    });
  }

  private getHistorico() {
    this.http.post('http://localhost:3000/pegaHistorico', {
      id: this.AuthS.pegaIdUsuario()
    }).subscribe((compras: any[]) => {
      compras.forEach(compra => {
        // tslint:disable-next-line: max-line-length
        let hora = (new Date(compra.hora_compra * 1000).getHours()).toString();
        if (hora.length === 1) {
          hora = '0' + (new Date(compra.hora_compra * 1000).getHours()).toString();
        }
        let minuto = (new Date(compra.hora_compra * 1000).getMinutes()).toString();
        if (minuto.length === 1) {
          minuto = '0' + (new Date(compra.hora_compra * 1000).getMinutes()).toString();
        }
        compra.hora_compra =  hora + ':' + minuto;
        this.historico.push(compra);
      });
    });
  }

  public getProdutos(id) {
    this.loading = true;
    this.http.post('http://localhost:3000/pegaProdutoHistorico', {
      id_compra: id
    }).subscribe((dado: any) => {
      console.log(dado);
      this.loading = false;
      this.produtos = dado;
      this.displayProdutos = true;
    });
  }

  public showDialog() {
    this.display = true;
  }

  public desativaModoEditar() {
    this.formularioUsuario.patchValue({
      nome: this.usuario.nome,
      photoURL: this.usuario.photoURL,
      email: this.usuario.email
    });
    this.config = false;
  }

  public atualizaPerfil() {
    this.http.post('http://localhost:3000/atualizaUsuario', {
      nome: this.formularioUsuario.value.nome,
      photoURL: this.formularioUsuario.value.photoURL,
      id: this.AuthS.pegaIdUsuario()
    }).subscribe(dado => {
      console.log(dado);
      this.usuario.nome = this.formularioUsuario.value.nome;
      this.usuario.photoURL = this.formularioUsuario.value.photoURL;
    });
  }

  public uploadFile(event) {
    // Mensagem Personalizada
    this.messageService.add({
      severity: 'info',
      summary: 'Salvando foto',
      detail: 'Espere até a foto salvar para salvar as mudanças no perfil'
    });

    // Foto Carregando => Desabilita a opção de salvar
    this.salvar = false;
    const user = this.AuthS.pegaIdUsuario();
    const file = event.target.files[0];
    if (file.size > 10000000) {
      // Arquivo muito grande = Mensagem de erro
      this.messageService.add({
        severity: 'warn',
        summary: 'Arquivo inválido',
        detail: `O arquivo enviado é muito grande,
                tente novamente com um arquivo menor`
      });
    } else {
      // Função do FireBase de armazenamento
      const filePath = user + '/user';
      const ref = this.storage.ref(filePath);
      const task = ref
        .put(file)
        .then(dado => {
          ref.getDownloadURL().subscribe(foto => {
            this.usuario.photoURL = foto;
            // Mensagem Personalizada
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso!',
              detail: 'A foto foi salva!'
            });
            // Atualiza o formulário para depois salvar no banco de dados
            this.formularioUsuario.patchValue({ photoURL: foto });
            this.salvar = true;
          });
        })
        .catch(err => console.log(err));
    }
  }

  public ativaModoEditar() {
    (this.config) ? this.config = false : this.config = true;
  }
}
