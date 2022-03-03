import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppFeedbackHandleModalComponent } from './app-feedback-handle-modal.component';

const Materials = [
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
  declarations: [AppFeedbackHandleModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ...Materials
  ],
  exports: [AppFeedbackHandleModalComponent]
})
export class AppFeedbackHandleModalModule {
  static getComponent(): typeof AppFeedbackHandleModalComponent {
    return AppFeedbackHandleModalComponent;
  }
}
