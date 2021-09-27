import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarChartModule as NgxBarChartModule } from '@swimlane/ngx-charts';

import { BarChartComponent } from './bar-chart.component';

@NgModule({
  declarations: [BarChartComponent],
  imports: [
    CommonModule,
    NgxBarChartModule
  ],
  exports: [BarChartComponent]
})
export class BarChartModule { }
