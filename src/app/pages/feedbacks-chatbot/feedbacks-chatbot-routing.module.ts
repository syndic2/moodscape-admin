import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeedbacksChatbotComponent } from './feedbacks-chatbot.component';

const routes: Routes = [
  {
    path: '',
    component: FeedbacksChatbotComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbacksChatbotRoutingModule { }
