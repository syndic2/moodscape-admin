import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import { AddArticleModule } from 'src/app/components/pages/articles/add-article/add-article.module';
import { ListArticleModule } from 'src/app/components/pages/articles/list-article/list-article.module';

const Materials= [
  MatTabsModule
];

@NgModule({
  declarations: [ArticlesComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    ...Materials,
    AddArticleModule,
    ListArticleModule
  ]
})
export class ArticlesModule { }
