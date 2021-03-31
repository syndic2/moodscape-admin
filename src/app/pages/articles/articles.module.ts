import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';

import { QuillModule } from 'ngx-quill';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';

const MaterialModules= [
  MatButtonModule,
  MatInputModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatCardModule
];

@NgModule({
  declarations: [
    ArticlesComponent
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
