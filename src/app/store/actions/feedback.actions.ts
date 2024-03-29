import { createAction, props } from '@ngrx/store';

import { AppFeedback, AppFeedbacksGroupByRating, AppFeedbacksGrowthByYear, ChatbotFeedback } from 'src/app/models/feedback.model';

/**
 * Chatbot feedback
 */
//Fetch API
export const fetchChatbotFeedbacks = createAction('[Chatbot Feedback/API] Get chatbot feedbacks');

export const fetchHandleChatbotFeedback = createAction(
  '[Chatbot Feedback/API] Handle chatbot feedback',
  props<{ feedbackId: string, handleStatus: string, handleNote: string }>()
);

export const removeChatbotFeedbacksConfirmation = createAction(
  '[Chatbot Feedback/API] Remove chatbot feedbacks confirmation',
  props<{ feedbackIds: string[] }>()
);

export const fetchRemoveChatbotFeedbacks = createAction(
  '[Chatbot Feedback/API] Remove chatbot feedbacks',
  props<{ feedbackIds: string[], isSoftDelete: boolean }>()
);

//STORE
export const setChatbotFeedbacks = createAction(
  '[Chatbot Feedback/STORE] Set chatbot feedback',
  props<{ feedbacks: ChatbotFeedback[] }>()
);

export const handleChatbotFeedback = createAction(
  '[Chatbot Feedback/STORE] Set handle chatbot feedback',
  props<{ feedbackId: string, handleStatus: string, handleNote: string }>()
);

export const removeChatbotFeedbacks = createAction(
  '[Chatbot Feedback/STORE] Remove chatbot feedbacks',
  props<{ feedbackIds: string[] }>()
);

/**
 * App feedback
 */
//FetchAPI
export const fetchAppFeedbacks = createAction('[App Feedback/API] Get app feedbacks');

export const fetchAppFeedbacksByRating = createAction('[App Feedback/API] Get app feedbacks by rating');

export const fetchAppFeedbacksGrowthByYear = createAction(
  '[App Feedback/API] Get app feedbacks growth by year',
  props<{ startDate: string, endDate: string }>()
);

export const fetchAppFeedback = createAction(
  '[App Feedback/API] Get app feedback',
  props<{ feedbackId: string }>()
);

export const removeAppFeedbacksConfirmation = createAction(
  '[App Feedback/API] Remove app feedbacks confirmation',
  props<{ feedbackIds: string[] }>()
);

export const fetchHandleAppFeedback = createAction(
  '[App Feedback/API] Handle app feedback',
  props<{ feedbackId: string, handleStatus: string, handleNote: string }>()
);

export const fetchRemoveAppFeedbacks = createAction(
  '[App Feedback/API] Remove app feedbacks',
  props<{ feedbackIds: string[], isSoftDelete: boolean }>()
);

//STORE
export const setAppFeedbacks = createAction(
  '[App Feedback/STORE] Set app feedbacks',
  props<{ feedbacks: AppFeedback[] }>()
);

export const setAppFeedbacksGroupByRating = createAction(
  '[App Feedback/STORE] Set app feedbacks by group rating',
  props<{ feedbacksGroupByRating: AppFeedbacksGroupByRating }>()
);

export const setAppFeedbacksGrowthByYear = createAction(
  '[App Feedback/STORE] Set app feedbacks growth by year',
  props<{ feedbacks: AppFeedbacksGrowthByYear[] }>()
);

export const handleAppFeedback = createAction(
  '[App Feedback/STORE] Set handle app feedback',
  props<{ feedbackId: string, handleStatus: string, handleNote: string }>()
);

export const removeAppFeedbacks = createAction(
  '[App Feedback/STORE] Remove app feedbacks',
  props<{ feedbackIds: string[] }>()
);
