import { createAction, props } from '@ngrx/store';

import { AppFeedback, AppFeedbacksGroupByRating, AppFeedbacksGrowthByYear } from 'src/app/models/feedback.model';

/**
 * Chatbot feedback
 */
//Fetch API

//STORE


/**
 * App feedback
 */
//FetchAPI
export const fetchAppFeedbacks= createAction('[App Feedback/API] Get app feedbacks');

export const fetchAppFeedbacksByRating= createAction('[App Feedback/API] Get app feedbacks by rating');

export const fetchAppFeedbacksGrowthByYear= createAction(
  '[App Feedback/API] Get app feedbacks growth by year',
  props<{ startDate: string, endDate: string }>()
);

export const fetchAppFeedback= createAction(
  '[App Feedback/API] Get app feedback',
  props<{ feedbackId: string }>()
);

export const removeAppFeedbacksConfirmation= createAction(
  '[App Feedback/API] Remove app feedbacks confirmation',
  props<{ feedbackIds: string[] }>()
);

export const fetchRemoveAppFeedbacks= createAction(
  '[App Feedback/API] Remove app feedbacks',
  props<{ feedbackIds: string[] }>()
);

//STORE
export const setAppFeedbacks= createAction(
  '[App Feedback/STORE] Set app feedbacks',
  props<{ feedbacks: AppFeedback[] }>()
);

export const setAppFeedbacksGroupByRating= createAction(
  '[App Feedback/STORE] Set app feedbacks by group rating',
  props<{ feedbacksGroupByRating: AppFeedbacksGroupByRating }>()
);

export const setAppFeedbacksGrowthByYear= createAction(
  '[App Feedback/STORE] Set app feedbacks growth by year',
  props<{ feedbacks: AppFeedbacksGrowthByYear[] }>()
);

export const removeAppFeedbacks= createAction(
  '[App Feedback/STORE] Remove app feedbacks',
  props<{ feedbackIds: string[] }>()
);