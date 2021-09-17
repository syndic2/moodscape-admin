import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

import { Subject } from 'rxjs';

import { AddArticleComponent } from 'src/app/components/pages/articles/add-article/add-article.component';
import { ListArticleComponent } from 'src/app/components/pages/articles/list-article/list-article.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  @ViewChild(AddArticleComponent) addArticleComponent: AddArticleComponent;
  @ViewChild(ListArticleComponent) listArticleComponent: ListArticleComponent;

  public selectedTab: FormControl= new FormControl(0);
  public articleId: Subject<number>= new Subject<number>();

  constructor(private titleService: Title) {
    this.titleService.setTitle('Kelola Artikel');
  }

  ngOnInit(): void {
    this.selectedTab.setValue(1);
  }

  onSelectArticle(articleId) {
    this.articleId.next(articleId);
    this.selectedTab.setValue(0);
  }
}
