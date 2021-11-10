import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ColorSketchModule } from 'ngx-color/sketch';

import { AddThemeComponent } from './add-theme.component';

const Materials= [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule
];

@NgModule({
  declarations: [AddThemeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...Materials,
    ColorSketchModule
  ],
  exports: [AddThemeComponent]
})
export class AddThemeModule { }
