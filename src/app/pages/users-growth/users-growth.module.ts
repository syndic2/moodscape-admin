import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersGrowthRoutingModule } from './users-growth-routing.module';
import { UsersGrowthComponent } from './users-growth.component';

@NgModule({
  declarations: [
    UsersGrowthComponent
  ],
  imports: [
    CommonModule,
    UsersGrowthRoutingModule
  ]
})
export class UsersGrowthModule { }
