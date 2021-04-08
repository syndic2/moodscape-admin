import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';

import { MaterialsModule } from './materials.module';
import { DialogComponent } from 'src/app/components/utilities/dialog/dialog.component';
import { ConfirmationDialogComponent } from 'src/app/components/utilities/confirmation-dialog/confirmation-dialog.component';
import { AddArticleComponent } from 'src/app/components/pages/articles/add-article/add-article.component';
import { ListArticleComponent } from 'src/app/components/pages/articles/list-article/list-article.component';

const Components= [
  AddArticleComponent,
  ListArticleComponent
];

@NgModule({
  declarations: [
    ...Components,
    DialogComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ],
  entryComponents: [
    DialogComponent,
    ConfirmationDialogComponent
  ],
  exports: [
    MaterialsModule,
    ...Components
  ]
})
export class ComponentsModule { }
