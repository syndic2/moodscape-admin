import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ChatbotFeedbackDetailComponent } from './chatbot-feedback-detail.component';

const Materials = [
  MatIconModule,
  MatButtonModule
];

@NgModule({
  declarations: [ChatbotFeedbackDetailComponent],
  imports: [
    CommonModule,
    ...Materials,
    ScrollingModule
  ],
  exports: [ChatbotFeedbackDetailComponent]
})
export class ChatbotFeedbackDetailModule {
  static getComponent(): typeof ChatbotFeedbackDetailComponent {
    return ChatbotFeedbackDetailComponent;
  }
}