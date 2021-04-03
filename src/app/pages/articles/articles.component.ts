import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article/article.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ConfirmationDialogComponent } from 'src/app/components/utilities/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public tableColumns: string[]= ['title', 'author', 'postedAt', 'reviewedBy', 'actions'];
  public tableDataSource: MatTableDataSource<Article>;
  public articleForm: FormGroup;
  public editorContent: string;

  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private articleService: ArticleService,
    public loaderService: LoaderService) {
    this.titleService.setTitle('Kelola Artikel');
    this.initializeForm();
  }

  ngOnInit(): void {
  }

  private initializeForm() {
    this.articleForm= this.formBuilder.group({
      title: [''],
      shortSummary: [''],
      author: [''],
      postedAt: [''],
      reviewedBy: [''],
      headImg: [''],
      content: ['']
    });
  }

  loadArticle() {
    this.articleService.getAll().subscribe(res => {
      this.tableDataSource= new MatTableDataSource(res);
      this.tableDataSource.sort = this.sort;
      this.tableDataSource.paginator = this.paginator;
    });
  }

  changeTab(event) {
    if (event.index === 1) {
      this.loadArticle();
    }
  }

  onSubmit() {
    console.log(this.articleForm.value);
  }

  editorChanged(event: EditorChangeContent | EditorChangeSelection) {
    this.editorContent= event.editor.root.innerHTML;
  }

  searchArticle(event: Event) {
    const title= (event.target as HTMLInputElement).value;
    this.tableDataSource.filter= title.trim().toLowerCase();

    if (this.tableDataSource.paginator) this.tableDataSource.paginator.firstPage();
  }

  editArticle(article: Article) {
    alert(article.title);
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
