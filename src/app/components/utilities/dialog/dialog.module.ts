import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { DialogComponent } from './dialog.component';

const Materials= [
  MatIconModule,
  MatButtonModule,
  MatDialogModule
];

@NgModule({
  declarations: [DialogComponent],
  imports: [
    CommonModule,
    ...Materials
  ],
  exports: [DialogComponent]
})
export class DialogModule { }
