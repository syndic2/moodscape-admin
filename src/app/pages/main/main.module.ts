import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SideBarComponent } from 'src/app/components/side-bar/side-bar.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

const MaterialModules= [
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
  MatToolbarModule,
  MatMenuModule,
  MatListModule,
  MatSidenavModule
];

@NgModule({
  declarations: [
    MainComponent,
    SideBarComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ...MaterialModules,
    MainRoutingModule
  ]
})
export class MainModule { }
