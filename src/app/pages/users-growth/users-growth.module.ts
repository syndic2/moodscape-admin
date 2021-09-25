import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';

import { UsersGrowthRoutingModule } from './users-growth-routing.module';
import { UsersGrowthComponent } from './users-growth.component';
import { UserGraphsModule } from 'src/app/components/pages/users-growth/user-graphs/user-graphs.module';
import { ListUserModule } from 'src/app/components/pages/users-growth/list-user/list-user.module';

const Materials= [
  MatTabsModule
];

@NgModule({
  declarations: [
    UsersGrowthComponent
  ],
  imports: [
    CommonModule,
    UsersGrowthRoutingModule,
    ...Materials,
    UserGraphsModule,
    ListUserModule
  ]
})
export class UsersGrowthModule { }
