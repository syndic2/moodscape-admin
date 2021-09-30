import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppFeedbacksComponent } from './app-feedbacks.component';

const routes: Routes = [
  {
    path: '',
    component: AppFeedbacksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppFeedbacksRoutingModule { }
