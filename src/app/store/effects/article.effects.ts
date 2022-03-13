import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, exhaustMap, concatMap, mergeMap, switchMap } from 'rxjs/operators';

import { setIsResetForm, showDialog } from '../actions/application.actions';
import {
  fetchArticles,
  fetchArticle,
  validateCreateArticle,
  fetchCreateArticle,
  validateUpdateArticle,
  fetchUpdateArticle,
  removeArticlesConfirmation,
  fetchRemoveArticles,

  setArticles,
  setArticle,
  createArticle,
  updateArticle,
  removeArticles
} from '../actions/article.actions';
import { ArticleService } from 'src/app/services/article/article.service';
import { ConfirmationDialogComponent } from 'src/app/components/utilities/confirmation-dialog/confirmation-dialog.component';

@Injectable()
export class ArticleEffects {
  getArticles$ = createEffect(() => this.actions$.pipe(
    ofType(fetchArticles),
    exhaustMap(() => this.articleService.getArticles().pipe(
      map(res => setArticles({ articles: res }))
    ))
  ));

  validateCreateArticle$ = createEffect(() => this.actions$.pipe(
    ofType(validateCreateArticle),
    switchMap(({ fields, headerImgUpload, isInvalid }) => {
      if (isInvalid) {
        return [
          setIsResetForm({ isReset: false }),
          showDialog({
            config: {
              data: {
                message: 'Tidak boleh ada kolom yang kosong!',
                buttonText: {
                  close: 'OK'
                }
              }
            }
          })
        ];
      }

      return [fetchCreateArticle({ fields: fields, headerImgUpload })];
    })
  ));

  createArticle$ = createEffect(() => this.actions$.pipe(
    ofType(fetchCreateArticle),
    concatMap(({ fields, headerImgUpload }) => this.articleService.createArticle(fields, headerImgUpload).pipe(
      switchMap(res => [
        setIsResetForm({ isReset: true }),
        showDialog({
          config: {
            data: {
              message: res.response.text,
              buttonText: {
                close: 'OK'
              }
            }
          }
        }),
        createArticle({ article: res.createdArticle })
      ])
    ))
  ));

  validateUpdateArticle$ = createEffect(() => this.actions$.pipe(
    ofType(validateUpdateArticle),
    switchMap(({ articleId, fields, headerImgUpload, isInvalid }) => {
      if (isInvalid) {
        return [
          setIsResetForm({ isReset: false }),
          showDialog({
            config: {
              data: {
                message: 'Tidak boleh ada kolom yang kosong!',
                buttonText: {
                  close: 'OK'
                }
              }
            }
          })
        ];
      }

      return [fetchUpdateArticle({ articleId: articleId, headerImgUpload, fields: fields })];
    })
  ));

  updateArticle$ = createEffect(() => this.actions$.pipe(
    ofType(fetchUpdateArticle),
    concatMap(({ articleId, fields, headerImgUpload }) => this.articleService.updateArticle(articleId, fields, headerImgUpload).pipe(
      switchMap(res => [
        showDialog({
          config: {
            data: {
              message: res.response.text,
              buttonText: {
                close: 'OK'
              }
            }
          }
        }),
        updateArticle({ articleId: res.updatedArticle.Id, fields: res.updatedArticle })
      ])
    ))
  ));

  removeArticlesConfirmation$ = createEffect(() => this.actions$.pipe(
    ofType(removeArticlesConfirmation),
    exhaustMap(({ articleTitle, articleIds }) => {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: `Apa anda yakin ingin menghapus artikel: "${articleTitle}"?`,
          buttonText: {
            ok: 'Ya',
            cancel: 'Tidak'
          }
        }
      });

      return dialogRef.afterClosed().pipe(
        map(data => ({ dialogData: data, articleIds: articleIds }))
      )
    }),
    map(res => {
      if (res.dialogData.confirmation === 'yes') {
        this.store.dispatch(fetchRemoveArticles({ articleIds: res.articleIds }));
      }
    })
  ), { dispatch: false });

  removeArticles$ = createEffect(() => this.actions$.pipe(
    ofType(fetchRemoveArticles),
    mergeMap(({ articleIds }) => this.articleService.removeArticles(articleIds).pipe(
      map(res => removeArticles({ articleIds: res.removedArticles }))
    ))
  ));

  constructor(private store: Store, private actions$: Actions, private dialog: MatDialog, private articleService: ArticleService) { }
}

