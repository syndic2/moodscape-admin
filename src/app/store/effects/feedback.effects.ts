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
  removeAppFeedbacksConfirmation,
  fetchRemoveAppFeedbacks,

  setAppFeedbacks,
  setAppFeedbacksGroupByRating,
  setAppFeedbacksGrowthByYear,
  removeAppFeedbacks,

  /**
   * Chatbot feedback
   */
  fetchChatbotFeedbacks,
  removeChatbotFeedbacksConfirmation,
  fetchRemoveChatbotFeedbacks,

  setChatbotFeedbacks,
  removeChatbotFeedbacks
} from '../actions/feedback.actions';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { ConfirmationDialogComponent } from 'src/app/components/utilities/confirmation-dialog/confirmation-dialog.component';

@Injectable()
export class FeedbackEffects {
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

  removeAppFeedbacksConfirmation$ = createEffect(() => this.actions$.pipe(
    ofType(removeAppFeedbacksConfirmation),
    exhaustMap(({ feedbackIds }) => {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: 'Apakah anda yakin ingin menghapus umpan balik ini?',
          buttonText: {
            ok: 'Ya',
            cancel: 'Tidak'
          }
        }
      });

      return dialogRef.afterClosed().pipe(
        map(data => ({ dialogData: data, feedbackIds: feedbackIds }))
      );
    }),
    map(({ dialogData, feedbackIds }) => {
      if (dialogData.confirmation === 'yes') {
        this.store.dispatch(fetchRemoveAppFeedbacks({ feedbackIds: feedbackIds }));
      }
    })
  ), { dispatch: false });

  removeAppFeedbacks$ = createEffect(() => this.actions$.pipe(
    ofType(fetchRemoveAppFeedbacks),
    mergeMap(({ feedbackIds }) => this.feedbackService.removeAppFeedbacks(feedbackIds).pipe(
      map(res => removeAppFeedbacks({ feedbackIds: res.removedFeedbacks }))
    ))
  ));

  /**
   * Chatbot feedback
   */
  getChatbotFeedbacks$ = createEffect(() => this.actions$.pipe(
    ofType(fetchChatbotFeedbacks),
    exhaustMap(() => this.feedbackService.getChatbotFeedbacks().pipe(
      map(res => setChatbotFeedbacks({ feedbacks: res }))
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
          }
        }
      });

      return dialogRef.afterClosed().pipe(
        map(data => ({ dialogData: data, feedbackIds: feedbackIds }))
      );
    }),
    map(({ dialogData, feedbackIds }) => {
      if (dialogData.confirmation === 'yes') {
        this.store.dispatch(fetchRemoveChatbotFeedbacks({ feedbackIds: feedbackIds }));
      }
    })
  ), { dispatch: false });

  removeChatbotFeedbacks$ = createEffect(() => this.actions$.pipe(
    ofType(fetchRemoveChatbotFeedbacks),
    mergeMap(({ feedbackIds }) => this.feedbackService.removeChatbotFeedbacks(feedbackIds).pipe(
      map(res => removeChatbotFeedbacks({ feedbackIds: res.removedFeedbacks }))
    ))
  ));

  constructor(
    private store: Store,
    private actions$: Actions,
    private dialog: MatDialog,
    private feedbackService: FeedbackService
  ) { }
}
