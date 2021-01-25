import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPlacesComponent } from './admin-places.component';
import { AddEditPlaceComponent } from './add-edit-place/add-edit-place.component';

import { AdminComponentRoutingModule } from './admin-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AdminComponentRoutingModule
  ],
  declarations: [AdminPlacesComponent, AddEditPlaceComponent],
})
export class AdminModule { }
