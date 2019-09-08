import { AuthService } from './../auth.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-minha-loja',
  templateUrl: './minha-loja.component.html',
  styleUrls: ['./minha-loja.component.css']
})
export class MinhaLojaComponent implements OnInit {
  public mostraConteudo = false;
  public display = false;
  public loja: any = {};

  constructor(
    private AuthS: AuthService,
    private router: Router,
    private ngZone: NgZone,
    private http: HttpClient,
    private storage: AngularFireStorage) { }

  ngOnInit() {

    this.AuthS.pegaUsuarioAtual().then((dado) => {
      if (dado) {
        this.http.post('http://localhost:3000/buscaMinhaLoja',
          { uid: this.AuthS.pegaIdUsuario() })
          .subscribe((loja: any[]) => {
            this.loja = loja;
            this.mostraConteudo = true;
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
    const user = this.AuthS.pegaIdUsuario();
    const file = event.target.files[0];
    const filePath = user + '/loja';
    const ref = this.storage.ref(filePath);
    const task = ref.put(file).then((dado) => {
      ref.getDownloadURL().subscribe(foto => {
        this.http.post('http://localhost:3000/atualizaLoja',
          { url: foto, uid: user }).subscribe((res) => {
            this.http.post('http://localhost:3000/buscaMinhaLoja',
            { uid: this.AuthS.pegaIdUsuario() })
            .subscribe((loja: any[]) => {
              this.loja = loja;
              console.log(this.loja);
            });
          });
      });
    }).catch((err) => console.log(err));

  }
}
