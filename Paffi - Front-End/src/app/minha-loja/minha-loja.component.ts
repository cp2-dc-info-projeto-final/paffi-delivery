// tslint:disable-next-line: quotemark
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
// tslint:disable-next-line: quotemark
import { AuthService } from "./../auth.service";
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/api';
import { reject } from 'q';

@Component({
  selector: 'app-minha-loja',
  templateUrl: './minha-loja.component.html',
  styleUrls: ['./minha-loja.component.css']
})
export class MinhaLojaComponent implements OnInit {
  // Dados gerais da loja
  public produtos: any = [];
  public loja: any = {};
  private prodSelecionado: any = [];
  // Fim dos dados gerais da loja

  // Loading
  public loading = false;
  // Loading

  // Controladores de conteúdo
  public salvarProduto = true;
  public salvar = true;
  public mostraConteudo = false;
  public modoEditar = false;
  public display = false;
  public addProduto = false;
  public config = false;
  // Fim dos controladores de conteúdo

  // Formulários
  public formularioLoja: FormGroup;
  public formularioProduto: FormGroup;
  // FIm dos Formulários

  // Injetar na classe dependencias que serão utilizadas
  constructor(
    private AuthS: AuthService,
    private router: Router,
    private http: HttpClient,
    private storage: AngularFireStorage,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loading = true;
    // Modo editar inicia desligado
    this.modoEditar = false;

    // Verifico se tem algum usuário logado
    this.AuthS.pegaUsuarioAtual().then(dado => {
      if (dado) {
        // Se tiver - Busca os dados da loja e os produtos e inicializa os formulários/funcionalidades
        this.http
          .post('http://localhost:3000/buscaMinhaLoja', {
            uid: this.AuthS.pegaIdUsuario()
          })
          .subscribe((loja: any[]) => {
            this.loja = loja;
            this.mostraConteudo = true;

            // Formulário para adicionar
            this.formularioProduto = this.formBuilder.group({
              nome: [null, Validators.required],
              photoURL: [null, Validators.required],
              senha: [null, Validators.required],
              turma: [null, Validators.required]
            });

            // Formulário de edição da loja
            this.formularioLoja = this.formBuilder.group({
              nome: this.loja.nome_loja,
              photoURL: this.loja.photoURL,
              descricao: this.loja.descricao
            });

            // Busca produtos da loja
            this.http
              .post('http://localhost:3000/buscaLojaProduto', {
                id: this.loja.id_loja
              })
              .subscribe(prod => {
                this.produtos = prod;
                this.loading = false;
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

  // Mostra janela de configurações de produto
  showConfig(produto) {
    this.prodSelecionado = produto;
    this.config = true;
  }

  // Mostra a janela de edição
  showDialog() {
    this.display = true;
  }

  // Abre janela de adicionar produto
  abreAddProduto() {
    this.addProduto = true;
  }

  // Faz o Upload da foto da loja
  uploadFile(event) {
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
      const filePath = user + '/loja';
      const ref = this.storage.ref(filePath);
      const task = ref
        .put(file)
        .then(dado => {
          ref.getDownloadURL().subscribe(foto => {
            this.loja.photoURL = foto;
            // Mensagem Personalizada
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso!',
              detail: 'A foto foi salva!'
            });
            // Atualiza o formulário para depois salvar no banco de dados
            this.formularioLoja.patchValue({ photoURL: foto });
            this.salvar = true;
          });
        })
        .catch(err => console.log(err));
    }
  }

  // Envia foto do produto
  uploadFileProduto(event) {
    // Pega o id do usuário pra inserir produto em sua loja
    const user = this.AuthS.pegaIdUsuario();
    const file = event.target.files[0];
    if (file.size > 10000000) {
      // Arquivo muito grande = Mensangem de erro
      this.messageService.add({
        severity: 'warn',
        summary: 'Arquivo inválido',
        detail: `O arquivo enviado é muito grande,
                tente novamente com um arquivo menor`
      });
    } else {
      // Mensagem Personalizada
      this.messageService.add({
        severity: 'info',
        summary: 'Salvando foto',
        detail: 'Espere até a foto salvar para adicionar o seu produto'
      });
      // Desabilita a opção de salvar enquanto a foto carrega
      this.salvarProduto = false;

      // Função do FireBase de armazenamento
      const filePath =
        user +
        '/file' +
        this.produtos.length +
        Math.floor(Math.random() * 100 + 1);
      const ref = this.storage.ref(filePath);
      const task = ref
        .put(file)
        .then(dado => {
          ref.getDownloadURL().subscribe(foto => {
            // Mensagem Personalizada
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso!',
              detail: 'A foto foi salva!'
            });
            // Atualiza formulário pra depois salvar no banco de dados
            this.formularioProduto.patchValue({ url: foto });
            this.salvarProduto = true;
          });
        })
        .catch(err => console.log(err));
    }
  }

  updateFotoProduto(event) {
    console.log('kkkk entrou');
    const file = event.target.files[0];
    if (file.size > 10000000) {
      // Arquivo muito grande = Mensangem de erro
      this.messageService.add({
        severity: 'warn',
        summary: 'Arquivo inválido',
        detail: `O arquivo enviado é muito grande,
                tente novamente com um arquivo menor`
      });
    } else {
      this.prodSelecionado.foto = file;
      console.log(this.prodSelecionado.foto);
      this.messageService.add({
        severity: 'info',
        summary: 'Salvando foto',
        detail: 'Espere até a foto salvar para adicionar o seu produto'
      });
    }
  }

  uploadUpdate(file) {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, reject) => {
      // Pega o id do usuário pra inserir produto em sua loja
      const user = this.AuthS.pegaIdUsuario();

      // Função do FireBase de armazenamento
      const filePath = user + '/file' + Math.floor(Math.random() * 100 + 1);
      const ref = this.storage.ref(filePath);
      const task = ref
        .put(file)
        .then(dado => {
          ref.getDownloadURL().subscribe(foto => {
            // Mensagem Personalizada
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso!',
              detail: 'A foto foi salva!'
            });
            // Atualiza formulário pra depois salvar no banco de dados
            resolve(foto);
          });
        })
        .catch(err => reject(err));
    });
  }

  // Ativa o modo de edição do perfil
  ativaModoEditar() {
    this.modoEditar ? (this.modoEditar = false) : (this.modoEditar = true);
  }

  // Cancela alterações do perfil e reseta o formulário
  desativaModoEditar() {
    this.formularioLoja.patchValue({
      nome: this.loja.nome_loja,
      photoURL: this.loja.photoURL,
      descricao: this.loja.descricao
    });
    this.modoEditar = false;
  }

  // Função para atualizar a loja
  atualizaLoja() {
    this.loading = true;
    // Requisição pro servidor NODE para atualizar a loja com os dados do formulário
    this.http
      .post('http://localhost:3000/atualizaLoja', {
        nome: this.formularioLoja.value.nome,
        url: this.formularioLoja.value.photoURL,
        descricao: this.formularioLoja.value.descricao,
        uid: this.AuthS.pegaIdUsuario()
      })
      .subscribe(dado => {
        // Buscando a loja novamente para atualizar os dados do perfil em tempo real
        this.http
          .post('http://localhost:3000/buscaMinhaLoja', {
            uid: this.AuthS.pegaIdUsuario()
          })
          .subscribe((loja: any[]) => {
            this.loading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Dados Alterados',
              detail: 'Perfil alterado com sucesso!'
            });
            this.loja = loja;
            this.mostraConteudo = true;
            // Resetando o formulário
            this.formularioLoja = this.formBuilder.group({
              nome: this.loja.nome_loja,
              photoURL: this.loja.photoURL,
              descricao: this.loja.descricao
            });
          });
      });
  }

  // Função que adiciona produtos
  addProdutos() {
    // Verifica se o formulário está válido
    if (this.formularioProduto.valid) {
      // Requisição para adicionar o produto no banco de dados
      this.http
        .post('http://localhost:3000/addProduto', {
          nome: this.formularioProduto.value.nome,
          url: this.formularioProduto.value.url,
          desc: this.formularioProduto.value.desc,
          cat: this.formularioProduto.value.cat,
          val: this.formularioProduto.value.val,
          id_loja: this.loja.id_loja
        })
        .subscribe(dado => {
          if (dado) {
            this.messageService.add({
              severity: 'success',
              summary: 'Produto adicionado',
              detail: 'O seu produto foi adicionado com sucesso!'
            });

            // Reseta formulário
            this.formularioProduto.reset();

            // Atualiza a lista de produtos para aparecer os recém adicionados
            this.http
              .post('http://localhost:3000/buscaLojaProduto', {
                id: this.loja.id_loja
              })
              .subscribe(prod => {
                this.produtos = prod;
                console.log(this.produtos);
              });
          }
        });
    } else {
      // Erro no preenchimento dos dados
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro no preenchimento',
        detail: 'Por favor preencha todos os dados para adicionar um produto.'
      });
    }
  }

  atualizaProduto() {
    this.loading = true;
    if (!this.formularioProduto.value.nome) {
      this.formularioProduto.patchValue({
        nome: this.prodSelecionado.nome
      });
    }

    if (!this.formularioProduto.value.desc) {
      this.formularioProduto.patchValue({
        desc: this.prodSelecionado.descricao
      });
    }

    if (!this.formularioProduto.value.cat) {
      this.formularioProduto.patchValue({
        cat: this.prodSelecionado.categoria
      });
    }

    if (!this.formularioProduto.value.val) {
      this.formularioProduto.patchValue({
        val: this.prodSelecionado.valor
      });
    }
    this.config = false;
    if (this.prodSelecionado.foto) {
      this.uploadUpdate(this.prodSelecionado.foto).then(dado => {
        this.http
          .post('http://localhost:3000/updateProduto', {
            id: this.prodSelecionado.id_produto,
            nome: this.formularioProduto.value.nome,
            desc: this.formularioProduto.value.desc,
            val: this.formularioProduto.value.val,
            cat: this.formularioProduto.value.cat,
            photoURL: dado
          })
          .subscribe(x => {
            console.log(x);
            this.formularioProduto.reset();
            this.http
              .post('http://localhost:3000/buscaLojaProduto', {
                id: this.loja.id_loja
              })
              .subscribe(prod => {
                this.loading = false;
                this.produtos = prod;
                console.log(this.produtos);
              });
          });
      });
    } else {
      this.http
        .post('http://localhost:3000/updateProduto', {
          id: this.prodSelecionado.id_produto,
          nome: this.formularioProduto.value.nome,
          desc: this.formularioProduto.value.desc,
          val: this.formularioProduto.value.val,
          cat: this.formularioProduto.value.cat,
          photoURL: this.prodSelecionado.photoURL
        })
        .subscribe(x => {
          console.log(x);
          this.formularioProduto.reset();
          this.http
            .post('http://localhost:3000/buscaLojaProduto', {
              id: this.loja.id_loja
            })
            .subscribe(prod => {
              this.loading = false;
              this.produtos = prod;
              console.log(this.produtos);
            });
        });
    }
  }

  excluiProduto() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir esse produto?',
      accept: () => {
        this.http
          .post('http://localhost:3000/removeProduto', {
            id: this.prodSelecionado.id_produto
          })
          .subscribe(dado => {
            this.config = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso!',
              detail: 'Seu produto foi apagado!'
            });
            this.http
              .post('http://localhost:3000/buscaLojaProduto', {
                id: this.loja.id_loja
              })
              .subscribe(prod => {
                this.produtos = prod;
                console.log(this.produtos);
              });
          });
      }
    });
  }
}
