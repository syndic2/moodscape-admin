import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ColorSketchModule } from 'ngx-color/sketch';

import { ThemeDetailModalComponent } from './theme-detail-modal.component';

const Materials = [
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule
];

@NgModule({
  declarations: [ThemeDetailModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...Materials,
    ColorSketchModule
  ],
  exports: [ThemeDetailModalComponent]
})
export class ThemeDetailModalModule {
  static getComponent(): typeof ThemeDetailModalComponent {
    return ThemeDetailModalComponent;
  }
}
