import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BnavegacaoComponent } from './bnavegacao/bnavegacao.component';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    BnavegacaoComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    MenuModule,
    MenubarModule,
    ButtonModule
  ],
  exports: [
    BnavegacaoComponent
  ]
})
export class AplicacaoModule { }
