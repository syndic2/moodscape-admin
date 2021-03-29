import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbacksChatbotRoutingModule } from './feedbacks-chatbot-routing.module';
import { FeedbacksChatbotComponent } from './feedbacks-chatbot.component';

@NgModule({
  declarations: [
    FeedbacksChatbotComponent
  ],
  imports: [
    CommonModule,
    FeedbacksChatbotRoutingModule
  ]
})
export class FeedbacksChatbotModule { }
