import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BnavegacaoComponent } from './aplicacao/bnavegacao/bnavegacao.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'home', component:BnavegacaoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
