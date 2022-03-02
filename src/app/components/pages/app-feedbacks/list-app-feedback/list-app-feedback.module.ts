import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { EffectsModule } from '@ngrx/effects';

import { FeedbackEffects } from 'src/app/store/effects/feedback.effects';
import { ListAppFeedbackComponent } from './list-app-feedback.component';

const Materials = [
  MatIconModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule
];

@NgModule({
  declarations: [ListAppFeedbackComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([FeedbackEffects]),
    ...Materials
  ],
  exports: [ListAppFeedbackComponent]
})
export class ListAppFeedbackModule { }
