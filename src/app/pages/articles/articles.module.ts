import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { QuillModule } from 'ngx-quill';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';

const MaterialModules= [
  MatSnackBarModule
];

@NgModule({
  declarations: [
    ArticlesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ...MaterialModules,
    QuillModule.forRoot(),
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
