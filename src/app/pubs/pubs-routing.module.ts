import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PubsPage } from './pubs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: PubsPage,
    children: [
      {
        path: 'discover',
        children: [
          {
            path: '',
            loadChildren: () => import('./discover/discover.module').then( m => m.DiscoverPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/pubs/tabs/discover',
        pathMatch: 'full' 
      }
    ]
  },
  {
    path: '',
    redirectTo: '/pubs/tabs/discover',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PubsPageRoutingModule {}
