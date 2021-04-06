import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

import { Article } from 'src/app/models/article';

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
  public selectedArticle;

  constructor(private titleService: Title) {
    this.titleService.setTitle('Kelola Artikel');
  }

  ngOnInit(): void {
    this.selectedTab.setValue(1);
  }

  changeTab(event) {
    if (event.index === 1) {
      this.listArticleComponent.loadArticles();
    }
  }

  onSelectedArticle(article_id) {
    this.selectedArticle= article_id;

    this.selectedTab.setValue(0);
    this.addArticleComponent.articleService.getOne(article_id).subscribe((res: Article) => {
      this.addArticleComponent.articleForm.setValue(res);
      this.addArticleComponent.editMode(res.author);
    })
  }
}
