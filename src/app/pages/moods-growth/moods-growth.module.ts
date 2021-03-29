import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoodsGrowthRoutingModule } from './moods-growth-routing.module';
import { MoodsGrowthComponent } from './moods-growth.component';

@NgModule({
  declarations: [
    MoodsGrowthComponent
  ],
  imports: [
    CommonModule,
    MoodsGrowthRoutingModule
  ]
})
export class MoodsGrowthModule { }
