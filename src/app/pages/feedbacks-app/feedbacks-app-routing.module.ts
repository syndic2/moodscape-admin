import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeedbacksAppComponent } from './feedbacks-app.component';

const routes: Routes = [
  {
    path: '',
    component: FeedbacksAppComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbacksAppRoutingModule { }
