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
          },
          {
            path: ':placeId', //dynamic parameter -> different places with diff Id
            loadChildren: () => import('./discover/place-detail/place-detail.module').then( m => m.PlaceDetailPageModule)
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
