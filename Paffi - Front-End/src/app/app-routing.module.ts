import { MinhaLojaComponent } from './central-content/minha-loja/minha-loja.component';
import { HomeComponent } from './central-content/home/home.component';
import { CadastroComponent } from './central-content/cadastro/cadastro.component';
import { LoginComponent } from './central-content/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'minhaloja', component: MinhaLojaComponent},
  { path: 'cadastro', component: CadastroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
