import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';

import { ThemesRoutingModule } from './themes-routing.module';
import { ThemesComponent } from './themes.component';
import { AddThemeModule } from 'src/app/components/pages/themes/add-theme/add-theme.module';
import { ListThemeModule } from 'src/app/components/pages/themes/list-theme/list-theme.module';

const Materials= [
  MatTabsModule
];

@NgModule({
  declarations: [
    ThemesComponent
  ],
  imports: [
    CommonModule,
    ...Materials,
    ThemesRoutingModule,
    AddThemeModule,
    ListThemeModule
  ]
})
export class ThemesModule { }
