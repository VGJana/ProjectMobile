import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HandtekeningPaginaPageRoutingModule } from './handtekening-pagina-routing.module';

import { HandtekeningPaginaPage } from './handtekening-pagina.page';

import { NavController } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HandtekeningPaginaPageRoutingModule
  ],
  declarations: [HandtekeningPaginaPage]
})
export class HandtekeningPaginaPageModule { }
