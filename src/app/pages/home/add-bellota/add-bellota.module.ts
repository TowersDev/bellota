import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBellotaPageRoutingModule } from './add-bellota-routing.module';

import { AddBellotaPage } from './add-bellota.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    AddBellotaPageRoutingModule,
  ],
  declarations: [AddBellotaPage],
})
export class AddBellotaPageModule {}
