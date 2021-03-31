import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { HighchartsChartModule } from 'highcharts-angular';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LineChartAreaComponent } from 'src/app/widgets/line-chart-area/line-chart-area.component';
import { LineChartStatComponent } from 'src/app/widgets/line-chart-stat/line-chart-stat.component';
import { PieChartComponent } from 'src/app/widgets/pie-chart/pie-chart.component';

const MaterialModules= [
  MatIconModule,
  MatPaginatorModule,
  MatCardModule,
  MatTableModule
];

@NgModule({
  declarations: [
    DashboardComponent,
    LineChartAreaComponent,
    LineChartStatComponent,
    PieChartComponent
  ],
  imports: [
    CommonModule,
    ...MaterialModules,
    HighchartsChartModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
