import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminComponent } from './admin.component';
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
  declarations: [AdminComponent, AddEditPlaceComponent],
})
export class AdminModule { }
