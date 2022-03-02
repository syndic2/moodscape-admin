import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatbotFeedbacksComponent } from './chatbot-feedbacks.component';

const routes: Routes = [
  {
    path: '',
    component: ChatbotFeedbacksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatbotFeedbacksRoutingModule { }
