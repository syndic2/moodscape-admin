import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PieChartModule as NgxPieChartModule } from '@swimlane/ngx-charts';

import { PieChartComponent } from './pie-chart.component';

@NgModule({
  declarations: [PieChartComponent],
  imports: [
    CommonModule,
    NgxPieChartModule
  ],
  exports: [PieChartComponent]
})
export class PieChartModule { }
