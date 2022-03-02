import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { EffectsModule } from '@ngrx/effects';

import { FeedbackEffects } from 'src/app/store/effects/feedback.effects';
import { AppFeedbackGraphsComponent } from './app-feedback-graphs.component';
import { PieChartModule } from 'src/app/components/charts/pie-chart/pie-chart.module';
import { BarChartModule } from 'src/app/components/charts/bar-chart/bar-chart.module';

const Materials = [
  MatIconModule,
  MatButtonModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatFormFieldModule,
  MatDatepickerModule
];

@NgModule({
  declarations: [AppFeedbackGraphsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([FeedbackEffects]),
    ...Materials,
    PieChartModule,
    BarChartModule
  ],
  exports: [AppFeedbackGraphsComponent]
})
export class AppFeedbackGraphsModule { }
