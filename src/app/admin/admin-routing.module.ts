import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AddEditPlaceComponent } from './add-edit-place/add-edit-place.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'add-or-edit',
    component: AddEditPlaceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminComponentRoutingModule {}
