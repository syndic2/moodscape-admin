import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { EffectsModule } from '@ngrx/effects';
import { ThemeEffects } from 'src/app/store/effects/theme.effects';

import { ListThemeComponent } from './list-theme.component';
import { ThemeDetailModalModule } from '../theme-detail-modal/theme-detail-modal.module';

const Materials= [
  MatIconModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule
];

@NgModule({
  declarations: [ListThemeComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([ThemeEffects]),
    ...Materials,
    ThemeDetailModalModule
  ],
  exports: [ListThemeComponent]
})
export class ListThemeModule { }
