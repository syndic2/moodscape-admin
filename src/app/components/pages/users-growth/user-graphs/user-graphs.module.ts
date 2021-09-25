import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from 'src/app/store/effects/user.effects';

import { UserGraphsComponent } from './user-graphs.component';

const Materials= [

];

@NgModule({
  declarations: [UserGraphsComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([UserEffects]),
    //...Materials
  ],
  exports: [UserGraphsComponent]
})
export class UserGraphsModule { }
