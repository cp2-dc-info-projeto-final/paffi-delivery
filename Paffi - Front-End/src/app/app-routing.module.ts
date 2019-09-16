import { LojaComponent } from './loja/loja.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { MinhaLojaComponent } from './minha-loja/minha-loja.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'minhaloja', component: MinhaLojaComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'loja', component: LojaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
