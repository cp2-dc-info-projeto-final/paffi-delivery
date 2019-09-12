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

  // Dados gerais da loja
  public produtos: any = [];
  public loja: any = {};

  // Fim dos dados gerais da loja

  // Controladores de conteúdo
  public salvarProduto = true;
  public salvar = true;
  public mostraConteudo = false;
  public modoEditar = false;
  public display = false;
  public addProduto = false;
  // Fim dos controladores de conteúdo

  // Formulários
  public formularioLoja: FormGroup;
  public formularioProduto: FormGroup;
  // FIm dos Formulários

  // Injetar na classe dependencias que serão utilizadas
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
    // Modo editar inicia desligado
    this.modoEditar = false;

    // Verifico se tem algum usuário logado
    this.AuthS.pegaUsuarioAtual().then((dado) => {
      if (dado) {

        // Se tiver - Busca os dados da loja e os produtos e inicializa os formulários/funcionalidades
        this.http.post('http://localhost:3000/buscaMinhaLoja',
          { uid: this.AuthS.pegaIdUsuario() })
          .subscribe((loja: any[]) => {
            this.loja = loja;
            this.mostraConteudo = true;

            // Formulário para adicionar
            this.formularioProduto = this.formBuilder.group({
              nome: [null, Validators.required],
              url: [null, Validators.required],
              desc: [null, Validators.required],
              cat: [null, Validators.required],
              val: [null, Validators.required]
            });

            // Formulário de edição da loja
            this.formularioLoja = this.formBuilder.group({
              nome: this.loja.nome_loja,
              photoURL: this.loja.photoURL,
              descricao: this.loja.descricao,
            });

            // Busca produtos da loja
            this.http.post('http://localhost:3000/buscaLojaProduto',
              { id: this.loja.id_loja }).subscribe(prod => {
                this.produtos = prod;
                console.log(this.produtos);
              });
          });
      } else {

        // Se não tiver, esconde o conteúdo da página e manda pra tela de login
        this.mostraConteudo = false;
        this.router.navigate(['']);
      }
    });
  }

  // Mostra a janela de edição
  showDialog() {
    this.display = true;
  }

  // Abre janela de adicionar produto
  abreAddProduto() {
    this.addProduto = true;
  }

  // Faz o Upload da foto
  uploadFile(event) {

    // Mensagem Personalizada
    this.messageService.add({
      severity: 'info',
      summary: 'Salvando foto',
      detail: 'Espere até a foto salvar para salvar as mudanças no perfil'
    });

    // Função do FireBase de armazenamento
    this.salvar = false;
    const user = this.AuthS.pegaIdUsuario();
    const file = event.target.files[0];
    const filePath = user + '/loja';
    const ref = this.storage.ref(filePath);
    const task = ref.put(file).then((dado) => {
      ref.getDownloadURL().subscribe(foto => {

        // Mensagem Personalizada
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

  uploadFileProduto(event) {

    // Mensagem Personalizada
    this.messageService.add({
      severity: 'info',
      summary: 'Salvando foto',
      detail: 'Espere até a foto salvar para adicionar o seu produto'
    });

    // Função do FireBase de armazenamento
    this.salvarProduto = false;
    const user = this.AuthS.pegaIdUsuario();
    const file = event.target.files[0];
    const filePath = user + '/file' + this.produtos.length + 1;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file).then((dado) => {
      ref.getDownloadURL().subscribe(foto => {

        // Mensagem Personalizada
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'A foto foi salva!'
        });
        this.formularioProduto.patchValue({ url: foto });
        this.salvarProduto = true;
      });
    }).catch((err) => console.log(err));
  }

  // Ativa o modo de edição do perfil
  ativaModoEditar() {
    (this.modoEditar) ? this.modoEditar = false : this.modoEditar = true;
  }

  // Função para atualizar a loja
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

  // Função que adiciona produtos
  addProdutos() {
    if (this.formularioProduto.valid) {
      this.http.post('http://localhost:3000/addProduto',
        {
          nome: this.formularioProduto.value.nome,
          url: this.formularioProduto.value.url,
          desc: this.formularioProduto.value.desc,
          cat: this.formularioProduto.value.cat,
          val: this.formularioProduto.value.val,
          id_loja: this.loja.id_loja
        }).subscribe(dado => {
          if (dado) {
            this.messageService.add({
              severity: 'success',
              summary: 'Produto adicionado',
              detail: 'O seu produto foi adicionado com sucesso!'
            });
            this.formularioProduto.reset();
            this.http.post('http://localhost:3000/buscaLojaProduto',
              { id: this.loja.id_loja }).subscribe(prod => {
                this.produtos = prod;
                console.log(this.produtos);
              });
          }
        });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro no preenchimento',
        detail: 'Por favor preencha todos os dados para adicionar um produto.'
      });
    }
  }
}
