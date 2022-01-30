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
import { MoodEffects } from 'src/app/store/effects/mood.effects';

import { MoodGraphsComponent } from './mood-graphs.component';
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
  declarations: [MoodGraphsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([MoodEffects]),
    ...Materials,
    PieChartModule,
    BarChartModule
  ],
  exports: [MoodGraphsComponent]
})
export class MoodGraphsModule { }
