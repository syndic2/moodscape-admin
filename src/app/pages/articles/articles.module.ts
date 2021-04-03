import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { QuillModule } from 'ngx-quill';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import { ConfirmationDialogComponent } from 'src/app/components/utilities/confirmation-dialog/confirmation-dialog.component';

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
  declarations: [
    ArticlesComponent,
    ConfirmationDialogComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...MaterialModules,
    QuillModule.forRoot(),
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
