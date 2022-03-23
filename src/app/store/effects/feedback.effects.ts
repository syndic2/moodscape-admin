import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, exhaustMap, mergeMap } from 'rxjs/operators';

import {
  /**
   * App feedback
   */
  fetchAppFeedbacks,
  fetchAppFeedbacksByRating,
  fetchAppFeedbacksGrowthByYear,
  fetchHandleAppFeedback,
  removeAppFeedbacksConfirmation,
  fetchRemoveAppFeedbacks,

  setAppFeedbacks,
  setAppFeedbacksGroupByRating,
  setAppFeedbacksGrowthByYear,
  handleAppFeedback,
  removeAppFeedbacks,

  /**
   * Chatbot feedback
   */
  fetchChatbotFeedbacks,
  fetchHandleChatbotFeedback,
  removeChatbotFeedbacksConfirmation,
  fetchRemoveChatbotFeedbacks,

  setChatbotFeedbacks,
  handleChatbotFeedback,
  removeChatbotFeedbacks
} from '../actions/feedback.actions';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { ConfirmationDialogComponent } from 'src/app/components/utilities/confirmation-dialog/confirmation-dialog.component';

@Injectable()
export class FeedbackEffects {
  /**
   * Chatbot feedback
   */
  getChatbotFeedbacks$ = createEffect(() => this.actions$.pipe(
    ofType(fetchChatbotFeedbacks),
    exhaustMap(() => this.feedbackService.getChatbotFeedbacks().pipe(
      map(res => setChatbotFeedbacks({ feedbacks: res }))
    ))
  ));

  handleChatbotFeedback$ = createEffect(() => this.actions$.pipe(
    ofType(fetchHandleChatbotFeedback),
    exhaustMap(({ feedbackId, handleStatus, handleNote }) => this.feedbackService.handleChatbotFeedback(feedbackId, handleStatus, handleNote).pipe(
      map(() => handleChatbotFeedback({ feedbackId, handleStatus, handleNote }))
    ))
  ));

  removeChatbotFeedbacksConfirmation$ = createEffect(() => this.actions$.pipe(
    ofType(removeChatbotFeedbacksConfirmation),
    exhaustMap(({ feedbackIds }) => {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: 'Apakah anda yakin ingin menghapus umpan balik ini?',
          buttonText: {
            ok: 'Ya',
            cancel: 'Tidak'
          },
          checkBox: {
            text: 'Hapus kasar'
          }
        }
      });

      return dialogRef.afterClosed().pipe(
        map(data => ({ dialogData: data, feedbackIds: feedbackIds }))
      );
    }),
    map(({ dialogData, feedbackIds }) => {
      if (dialogData.confirmation === 'yes') {
        this.store.dispatch(fetchRemoveChatbotFeedbacks({ feedbackIds: feedbackIds, isSoftDelete: !dialogData.checkBoxChecked ? true : false }));
      }
    })
  ), { dispatch: false });

  removeChatbotFeedbacks$ = createEffect(() => this.actions$.pipe(
    ofType(fetchRemoveChatbotFeedbacks),
    mergeMap(({ feedbackIds, isSoftDelete }) => this.feedbackService.removeChatbotFeedbacks(feedbackIds, isSoftDelete).pipe(
      map(res => removeChatbotFeedbacks({ feedbackIds: res.removedFeedbacks }))
    ))
  ));

  /**
   * App feedback
   */
  getAppFeedbacks$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAppFeedbacks),
    exhaustMap(() => this.feedbackService.getAppFeedbacks().pipe(
      map(res => setAppFeedbacks({ feedbacks: res }))
    ))
  ));

  getAppFeedbacksGroupByRating$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAppFeedbacksByRating),
    exhaustMap(() => this.feedbackService.getAppFeedbacksGroupByRating().pipe(
      map(res => setAppFeedbacksGroupByRating({ feedbacksGroupByRating: res }))
    ))
  ));

  getAppFeedbacksGrowthByYear$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAppFeedbacksGrowthByYear),
    exhaustMap(({ startDate, endDate }) => this.feedbackService.getAppFeedbacksGrowthByYear(startDate, endDate).pipe(
      map(res => setAppFeedbacksGrowthByYear({ feedbacks: res }))
    ))
  ));

  handleAppFeedback$ = createEffect(() => this.actions$.pipe(
    ofType(fetchHandleAppFeedback),
    exhaustMap(({ feedbackId, handleStatus, handleNote }) => this.feedbackService.handleAppFeedback(feedbackId, handleStatus, handleNote).pipe(
      map(() => handleAppFeedback({ feedbackId, handleStatus, handleNote }))
    ))
  ));

  removeAppFeedbacksConfirmation$ = createEffect(() => this.actions$.pipe(
    ofType(removeAppFeedbacksConfirmation),
    exhaustMap(({ feedbackIds }) => {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: 'Apakah anda yakin ingin menghapus umpan balik ini?',
          buttonText: {
            ok: 'Ya',
            cancel: 'Tidak'
          },
          checkBox: {
            text: 'Hapus kasar'
          }
        }
      });

      return dialogRef.afterClosed().pipe(
        map(data => ({ dialogData: data, feedbackIds: feedbackIds }))
      );
    }),
    map(({ dialogData, feedbackIds }) => {
      if (dialogData.confirmation === 'yes') {
        this.store.dispatch(fetchRemoveAppFeedbacks({ feedbackIds: feedbackIds, isSoftDelete: !dialogData.checkBoxChecked ? true : false }));
      }
    })
  ), { dispatch: false });

  removeAppFeedbacks$ = createEffect(() => this.actions$.pipe(
    ofType(fetchRemoveAppFeedbacks),
    mergeMap(({ feedbackIds, isSoftDelete }) => this.feedbackService.removeAppFeedbacks(feedbackIds).pipe(
      map(res => removeAppFeedbacks({ feedbackIds: res.removedFeedbacks }))
    ))
  ));

  constructor(
    private store: Store,
    private actions$: Actions,
    private dialog: MatDialog,
    private feedbackService: FeedbackService
  ) { }
}
