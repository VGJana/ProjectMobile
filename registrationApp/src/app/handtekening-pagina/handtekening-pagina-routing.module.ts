import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HandtekeningPaginaPage } from './handtekening-pagina.page';

const routes: Routes = [
  {
    path: '',
    component: HandtekeningPaginaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HandtekeningPaginaPageRoutingModule { }
