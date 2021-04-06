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

import { ConfirmationDialogComponent } from 'src/app/components/utilities/confirmation-dialog/confirmation-dialog.component';
import { AddArticleComponent } from 'src/app/components/pages/articles/add-article/add-article.component';
import { ListArticleComponent } from 'src/app/components/pages/articles/list-article/list-article.component';

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

const Components= [
  AddArticleComponent,
  ListArticleComponent
];

@NgModule({
  declarations: [...Components, ConfirmationDialogComponent],
  imports: [
    CommonModule,
    ...MaterialModules,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  exports: [
    ...MaterialModules,
    ...Components
  ]
})
export class ComponentsModule { }
