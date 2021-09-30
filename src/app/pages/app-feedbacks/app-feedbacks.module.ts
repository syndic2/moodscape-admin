import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';

import { AppFeedbacksRoutingModule } from './app-feedbacks-routing.module';
import { AppFeedbacksComponent } from './app-feedbacks.component';
import { AppFeedbackGraphsModule } from 'src/app/components/pages/app-feedbacks/app-feedback-graphs/app-feedback-graphs.module';
import { ListAppFeedbackModule } from 'src/app/components/pages/app-feedbacks/list-app-feedback/list-app-feedback.module';

const Materials= [
  MatTabsModule
];

@NgModule({
  declarations: [
    AppFeedbacksComponent
  ],
  imports: [
    CommonModule,
    ...Materials,
    AppFeedbacksRoutingModule,
    AppFeedbackGraphsModule,
    ListAppFeedbackModule
  ]
})
export class AppFeedbacksModule { }
