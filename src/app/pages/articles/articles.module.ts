import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from './modules/components.module';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';

@NgModule({
  declarations: [
    ArticlesComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ArticlesRoutingModule,
  ]
})
export class ArticlesModule { }
