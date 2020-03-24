import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab3',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./tab3/tab3.module').then(m => m.Tab3PageModule)
      }
    ]
  },
  {
    path: 'handtekening/:location',
    loadChildren: () => import('./handtekening-pagina/handtekening-pagina.module').then(m => m.HandtekeningPaginaPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
