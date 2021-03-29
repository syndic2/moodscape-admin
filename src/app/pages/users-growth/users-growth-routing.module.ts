import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersGrowthComponent } from './users-growth.component';

const routes: Routes = [
  {
    path: '',
    component: UsersGrowthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersGrowthRoutingModule { }
