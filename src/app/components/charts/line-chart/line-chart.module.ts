import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LineChartModule as NgxLineChartModule } from '@swimlane/ngx-charts';

import { LineChartComponent } from './line-chart.component';

@NgModule({
  declarations: [LineChartComponent],
  imports: [
    CommonModule,
    NgxLineChartModule
  ],
  exports: [LineChartComponent]
})
export class LineChartModule { }
