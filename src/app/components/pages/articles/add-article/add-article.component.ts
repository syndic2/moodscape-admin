import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

import { ArticleService } from 'src/app/services/article/article.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'AddArticle',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  @Input() selectedArticle: string= '';

  public articleForm: FormGroup;
  public editorContent: string;

  constructor(
    private formBuilder: FormBuilder,
    public articleService: ArticleService,
    public loaderService: LoaderService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.articleForm.controls.author.disable();
  }

  initializeForm() {
    this.articleForm= this.formBuilder.group({
      title: [''],
      shortSummary: [''],
      author: ['Admin'],
      postedAt: [''],
      reviewedBy: [''],
      content: ['']
    });
  }

  clearForm() {
    this.selectedArticle= '';

    this.articleForm.reset();
    this.articleForm.enable();
    this.articleForm.controls.author.disable();
    this.articleForm.controls.author.setValue('Admin');
  }

  editMode(author) {
    if (author !== 'Admin') {
      this.articleForm.controls.title.disable();
      this.articleForm.controls.shortSummary.disable();
      this.articleForm.controls.postedAt.disable();
      this.articleForm.controls.reviewedBy.disable();
    } else {
      this.articleForm.enable();
      this.articleForm.controls.author.disable();
      this.articleForm.controls.author.setValue('Admin');
    }
  }

  onSave() {
    this.articleService.update(this.selectedArticle, this.articleForm.getRawValue()).subscribe(res => {
      this.selectedArticle= '';

      if (!res.updated) this.clearForm();
    });
  }

  //QUILL EDITOR
  editorChanged(event: EditorChangeContent | EditorChangeSelection) {
    this.editorContent= event.editor.root.innerHTML;
  }
}
