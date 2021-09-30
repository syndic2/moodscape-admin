import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AppFeedbackDetailModalComponent } from './app-feedback-detail-modal.component';
import { StarRatingModule } from 'src/app/components/utilities/star-rating/star-rating.module';

const Materials= [
  MatIconModule,
  MatButtonModule,
  MatDialogModule
];

@NgModule({
  declarations: [AppFeedbackDetailModalComponent],
  imports: [
    CommonModule,
    ...Materials,
    StarRatingModule
  ],
  exports: [AppFeedbackDetailModalComponent]
})
export class AppFeedbackDetailModalModule { }
