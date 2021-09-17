import { Component, OnInit, OnDestroy, Output, ViewChild, EventEmitter } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Article } from 'src/app/models/article.model';
import { fetchArticles, removeArticlesConfirmation } from 'src/app/store/actions/article.actions';
import { getArticles } from 'src/app/store/selectors/article.selectors';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})
export class ListArticleComponent implements OnInit, OnDestroy {
  @Output() selectArticleEvent: EventEmitter<number>= new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public tableColumns: string[]= ['title', 'author', 'postedAt', 'reviewedBy', 'actions'];
  public tableDataSource: MatTableDataSource<Article>;
  private getArticlesSubscription: Subscription;

  constructor(private store: Store, public utilitiesService: UtilitiesService) { }

  ngOnInit(): void {
    this.getArticlesSubscription= this.store.select(getArticles).subscribe(res => {
      if (!res.length) {
        this.loadArticles();
      } else {
        this.tableDataSource= new MatTableDataSource(res);
        this.tableDataSource.sort = this.sort;
        this.tableDataSource.paginator = this.paginator;
      }
    });
  }

  ngOnDestroy() {
    this.getArticlesSubscription && this.getArticlesSubscription.unsubscribe();
  }

  loadArticles() {
    this.store.dispatch(fetchArticles());
  }

  search(event: Event) {
    const title= (event.target as HTMLInputElement).value;
    this.tableDataSource.filter= title.trim().toLowerCase();

    if (this.tableDataSource.paginator) this.tableDataSource.paginator.firstPage();
  }

  onEdit(article: Article) {
    this.selectArticleEvent.emit(article.Id);
  }

  onRemove(article: Article) {
    this.store.dispatch(removeArticlesConfirmation({ articleTitle: article.title, articleIds: [article.Id] }));
  }
}
