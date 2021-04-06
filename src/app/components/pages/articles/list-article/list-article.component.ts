import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article/article.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

import { ConfirmationDialogComponent } from 'src/app/components/utilities/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'ListArticle',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})
export class ListArticleComponent implements OnInit {
  @Output() selectedArticle= new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public tableColumns: string[]= ['title', 'author', 'postedAt', 'reviewedBy', 'actions'];
  public tableDataSource: MatTableDataSource<Article>;

  constructor(
    private dialog: MatDialog,
    private articleService: ArticleService,
    public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(forceLoad: boolean= false) {
    if (!this.tableDataSource || forceLoad) {
      this.articleService.getAll().subscribe((res: Article[]) => {
        this.tableDataSource= new MatTableDataSource(res);
        this.tableDataSource.sort = this.sort;
        this.tableDataSource.paginator = this.paginator;
      });
    }
  }

  searchArticle(event: Event) {
    const title= (event.target as HTMLInputElement).value;
    this.tableDataSource.filter= title.trim().toLowerCase();

    if (this.tableDataSource.paginator) this.tableDataSource.paginator.firstPage();
  }

  editArticle(article: Article) {
    this.selectedArticle.emit(article.Id);
  }

  removeArticle(article: Article) {
    const dialogRef= this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `Apa anda yakin ingin menghapus artikel: <b>"${article.title}"</b>?`,
        buttonText: {
          ok: 'Ya',
          cancel: 'Tidak'
        }
      }
    });

    dialogRef.afterClosed().subscribe((res: string) => {
      if (res === 'yes') {
        const articles: Article[]= this.tableDataSource.data.filter(obj => obj.Id !== article.Id);
        this.tableDataSource= new MatTableDataSource(articles);
      }
    });
  }
}