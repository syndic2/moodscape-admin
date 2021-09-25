import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

const Materials= [
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatCheckboxModule
];

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    ...Materials
  ],
  exports: [ConfirmationDialogComponent]
})
export class ConfirmationDialogModule { }
