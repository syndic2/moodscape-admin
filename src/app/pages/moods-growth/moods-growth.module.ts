import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoodsGrowthRoutingModule } from './moods-growth-routing.module';
import { MoodsGrowthComponent } from './moods-growth.component';
import { MoodGraphsModule } from 'src/app/components/pages/moods-growth/mood-graphs/mood-graphs.module';

@NgModule({
  declarations: [
    MoodsGrowthComponent
  ],
  imports: [
    CommonModule,
    MoodsGrowthRoutingModule,
    MoodGraphsModule
  ]
})
export class MoodsGrowthModule { }
