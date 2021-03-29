import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbacksAppRoutingModule } from './feedbacks-app-routing.module';
import { FeedbacksAppComponent } from './feedbacks-app.component';

@NgModule({
  declarations: [
    FeedbacksAppComponent
  ],
  imports: [
    CommonModule,
    FeedbacksAppRoutingModule
  ]
})
export class FeedbacksAppModule { }
