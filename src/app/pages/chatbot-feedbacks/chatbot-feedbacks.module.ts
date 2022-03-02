import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';

import { ChatbotFeedbacksRoutingModule } from './chatbot-feedbacks.routing.module';
import { ChatbotFeedbacksComponent } from './chatbot-feedbacks.component';

import { ListChatbotFeedbackModule } from 'src/app/components/pages/chatbot-feedbacks/list-chatbot-feedback/list-chatbot-feedback.module';

const Materials = [
  MatTabsModule
];

@NgModule({
  declarations: [
    ChatbotFeedbacksComponent
  ],
  imports: [
    CommonModule,
    ...Materials,
    ChatbotFeedbacksRoutingModule,
    ListChatbotFeedbackModule
  ]
})
export class ChatbotFeedbacksModule { }
