import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBellotaPage } from './add-bellota.page';

const routes: Routes = [
  {
    path: '',
    component: AddBellotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBellotaPageRoutingModule {}
