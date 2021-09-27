import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';

import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

import { checkFileType, transformDateTime } from 'src/app/utilities/helpers';
import { showDialog } from 'src/app/store/actions/application.actions';
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
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  private articleIdValue: number;
  public createArticleForm: FormGroup;
  private getArticleSubscription: Subscription;
  private getIsResetFormSubscription: Subscription;
  private contentValue: string;
  public headerImage: string;
  private headerImgUpload: File;
  private validImgType: boolean= true;

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
        if (res) {
          const result= { ...res };

          this.headerImage= result.headerImg;
          this.createArticleForm.patchValue(result);
          this.createArticleForm.updateValueAndValidity();

          if (result.author !== 'admin') {
            this.author.disable();
            this.postedAt.disable();
            this.reviewedBy.disable();
          }
        }
      });
    });
  }

  ngOnDestroy() {
    this.articleIdSubject && this.articleIdSubject.unsubscribe();
    this.getArticleSubscription && this.getArticleSubscription.unsubscribe();
    this.getIsResetFormSubscription && this.getIsResetFormSubscription.unsubscribe();
  }

  get title() {
    return this.createArticleForm.get('title');
  }

  get shortSummary() {
    return this.createArticleForm.get('shortSummary');
  }

  get author() {
    return this.createArticleForm.get('author');
  }

  get postedAt() {
    return this.createArticleForm.get('postedAt');
  }

  get reviewedBy() {
    return this.createArticleForm.get('reviewedBy');
  }

  get headerImgUrl() {
    return this.createArticleForm.get('headerImg');
  }

  get content() {
    return this.createArticleForm.get('content');
  }

  initializeForm() {
    this.createArticleForm= this.formBuilder.group({
      title: ['', Validators.required],
      shortSummary: [''],
      author: ['admin', Validators.required],
      postedAt: ['', Validators.required],
      reviewedBy: ['admin', Validators.required],
      headerImg: [''],
      content: ['', Validators.required]
    });
  }

  resetForm() {
    this.createArticleForm.reset();
    this.createArticleForm.enable();
    this.author.setValue('admin');
    this.reviewedBy.setValue('admin');
    this.articleIdValue= null;
    this.headerImgUpload= null;
    this.headerImage= '';

    if (this.fileInput) {
      this.fileInput.nativeElement.value= '';
    }

    this.validImgType= true;
    this.getArticleSubscription && this.getArticleSubscription.unsubscribe();
  }

  onSelectFile(event) {
    if (!checkFileType(event.target.files, ['jpg', 'jpeg', 'png'])) {
      this.validImgType= false;
      this.store.dispatch(showDialog({
        config: {
          data: {
            message: 'Ektensi file tidak sesuai dengan file gambar, harus menggunakan ektensi jpg, jpeg atau png',
            buttonText: {
              close: 'OK'
            }
          }
        }
      }));
    } else {
      const reader= new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload= (event: any) => {
        this.headerImage= event.target.result;
      };

      this.headerImgUpload= event.target.files[0];
      this.validImgType= true;
    }
  }

  onEditorChanged(event: EditorChangeContent | EditorChangeSelection) {
    this.contentValue= event.editor.root.innerHTML;
  }

  onSubmit() {
    if (!this.validImgType && this.headerImgUpload) {
      this.store.dispatch(showDialog({
        config: {
          data: {
            message: 'Ektensi file tidak sesuai dengan file gambar, harus menggunakan ektensi jpg, jpeg atau png',
            buttonText: {
              close: 'OK'
            }
          }
        }
      }));
    } else {
      this.postedAt.setValue(transformDateTime(new Date(this.postedAt.value)).toISODate());
      this.content.setValue(this.contentValue);

      if (this.headerImgUrl.value === null) {
        this.headerImgUrl.setValue('');
      }

      const fields= { ...this.createArticleForm.getRawValue() };

      if (!this.articleIdValue) {
        this.store.dispatch(validateCreateArticle({
          fields: fields,
          headerImgUpload: this.headerImgUpload,
          isInvalid: this.createArticleForm.invalid
        }));
      } else {
        this.store.dispatch(validateUpdateArticle({
          articleId: this.articleIdValue,
          fields: fields,
          headerImgUpload: this.headerImgUpload,
          isInvalid: this.createArticleForm.invalid
        }));
      }
    }
  }
}
