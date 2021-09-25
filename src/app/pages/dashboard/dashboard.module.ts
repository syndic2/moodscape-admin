import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

const Materials= [
  MatIconModule,
  MatPaginatorModule,
  MatCardModule,
  MatTableModule
];

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    ...Materials,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
