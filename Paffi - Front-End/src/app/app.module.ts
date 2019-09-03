import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { CadastroComponent } from './central-content/cadastro/cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './central-content/navbar/navbar.component';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpComponent } from './http/http.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginComponent } from './central-content/login/login.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/components/common/messageservice';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HomeComponent } from './central-content/home/home.component';
import { FileUploadModule } from 'primeng/fileupload';
import { MinhaLojaComponent } from './central-content/minha-loja/minha-loja.component';


export const firebaseConfig = {
  apiKey: 'AIzaSyCU162xBGghRaszmRllu4c9JdtzakJJyzM',
  authDomain: 'paffi-tcc.firebaseapp.com',
  databaseURL: 'https://paffi-tcc.firebaseio.com',
  projectId: 'paffi-tcc',
  storageBucket: 'paffi-tcc.appspot.com',
  messagingSenderId: '90869128650',
  appId: '1:90869128650:web:9fc2c7c03513c6de'
};

@NgModule({
  declarations: [
    AppComponent,
    HttpComponent,
    LoginComponent,
    NavbarComponent,
    CadastroComponent,
    HomeComponent,
    MinhaLojaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    BrowserAnimationsModule,
    DropdownModule,
    ScrollingModule,
    FileUploadModule,
    RouterModule,
    DialogModule
  ],
  providers: [
    AngularFireAuth,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
