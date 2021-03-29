import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoodsGrowthComponent } from './moods-growth.component';

const routes: Routes = [
  {
    path: '',
    component: MoodsGrowthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoodsGrowthRoutingModule { }
