import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ChatbotFeedbackHandleModalComponent } from './chatbot-feedback-handle-modal.component';

const Materials = [
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
  declarations: [ChatbotFeedbackHandleModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ...Materials
  ],
  exports: [ChatbotFeedbackHandleModalComponent]
})
export class ChatbotFeedbackHandleModalModule {
  static getComponent(): typeof ChatbotFeedbackHandleModalComponent {
    return ChatbotFeedbackHandleModalComponent;
  }
}
