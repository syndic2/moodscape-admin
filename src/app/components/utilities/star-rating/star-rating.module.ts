import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { StarRatingComponent } from './star-rating.component';

const Materials= [
  MatIconModule
];

@NgModule({
  declarations: [StarRatingComponent],
  imports: [
    CommonModule,
    ...Materials
  ],
  exports: [StarRatingComponent]
})
export class StarRatingModule { }
