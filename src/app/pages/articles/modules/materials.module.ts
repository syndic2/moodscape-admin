import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

const MaterialModules= [
  MatIconModule,
  MatDialogModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatInputModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSortModule,
  MatPaginatorModule,
  MatTabsModule,
  MatCardModule,
  MatTableModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MaterialModules
  ],
  exports: [
    ...MaterialModules
  ]
})
export class MaterialsModule { }
