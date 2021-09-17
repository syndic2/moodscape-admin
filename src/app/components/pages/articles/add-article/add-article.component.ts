import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';

import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

import { transformDateTime } from 'src/app/utilities/helpers';
import { validateCreateArticle, validateUpdateArticle } from 'src/app/store/actions/article.actions';
import { getIsResetForm } from 'src/app/store/selectors/application.selectors';
import { getArticle } from 'src/app/store/selectors/article.selectors';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit, OnDestroy {
  @Input('articleId') articleIdSubject: Subject<number>= new Subject<number>();

  public createArticleForm: FormGroup;
  private getArticleSubscription: Subscription;
  private getIsResetFormSubscription: Subscription;
  private articleIdValue: number;
  private contentValue: string;

  constructor(private store: Store, private formBuilder: FormBuilder, public utilitiesService: UtilitiesService) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.getIsResetFormSubscription= this.store.select(getIsResetForm).subscribe(res => {
      if (res) {
        this.resetForm();
      }
    });

    this.articleIdSubject.subscribe(value => {
      this.articleIdValue= value;
      this.getArticleSubscription= this.store.select(getArticle({ Id: value })).subscribe(res => {
        this.createArticleForm.patchValue({ ...res });
        this.createArticleForm.updateValueAndValidity();

        if (res.author !== 'admin') {
          this.createArticleForm.controls['author'].disable();
          this.createArticleForm.controls['postedAt'].disable();
          this.createArticleForm.controls['reviewedBy'].disable();
        }
      });
    });
  }

  ngOnDestroy() {
    this.articleIdSubject && this.articleIdSubject.unsubscribe();
    this.getArticleSubscription && this.getArticleSubscription.unsubscribe();
    this.getIsResetFormSubscription && this.getIsResetFormSubscription.unsubscribe();
  }

  get postedAt() {
    return this.createArticleForm.get('postedAt').value;
  }

  initializeForm() {
    this.createArticleForm= this.formBuilder.group({
      title: ['', Validators.required],
      shortSummary: ['', Validators.required],
      author: ['admin', Validators.required],
      postedAt: ['', Validators.required],
      reviewedBy: ['admin', Validators.required],
      content: ['', Validators.required]
    });
  }

  resetForm() {
    this.createArticleForm.reset();
    this.createArticleForm.enable();
    this.createArticleForm.controls['author'].setValue('admin');
    this.createArticleForm.controls['reviewedBy'].setValue('admin');
    this.articleIdValue= null;
    this.getArticleSubscription && this.getArticleSubscription.unsubscribe();
  }

  onEditorChanged(event: EditorChangeContent | EditorChangeSelection) {
    this.contentValue= event.editor.root.innerHTML;
  }

  onSubmit() {
    this.createArticleForm.controls['postedAt'].setValue(transformDateTime(new Date(this.postedAt)).toISODate());
    this.createArticleForm.controls['content'].setValue(this.contentValue);

    if (!this.articleIdValue) {
      this.store.dispatch(validateCreateArticle({
        fields: this.createArticleForm.getRawValue(),
        isInvalid: this.createArticleForm.invalid
      }));
    } else {
      this.store.dispatch(validateUpdateArticle({
        articleId: this.articleIdValue,
        fields: this.createArticleForm.getRawValue(),
        isInvalid: this.createArticleForm.invalid
      }));
    }
  }
}
