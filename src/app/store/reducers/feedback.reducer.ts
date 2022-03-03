import { createReducer, on } from '@ngrx/store';

import { filterArrayByAnotherArray } from 'src/app/utilities/helpers';
import { FeedbackState } from '../states';
import {
  setAppFeedbacks,
  setAppFeedbacksGroupByRating,
  setAppFeedbacksGrowthByYear,
  handleAppFeedback,
  removeAppFeedbacks,

  setChatbotFeedbacks,
  handleChatbotFeedback,
  removeChatbotFeedbacks
} from '../actions/feedback.actions';

const initialState: FeedbackState = {
  appFeedbacks: [],
  appFeedbacksGroupByRating: null,
  appFeedbackGrowthByYear: [],
  chatbotFeedbacks: []
};

export const feedbackReducer = createReducer(
  initialState,

  /**
   * App feedback
   */
  on(setAppFeedbacks, (state, { feedbacks }) => ({ ...state, appFeedbacks: [...feedbacks] })),
  on(setAppFeedbacksGroupByRating, (state, { feedbacksGroupByRating }) => ({ ...state, appFeedbacksGroupByRating: feedbacksGroupByRating })),
  on(setAppFeedbacksGrowthByYear, (state, { feedbacks }) => ({ ...state, appFeedbackGrowthByYear: [...feedbacks] })),
  on(handleAppFeedback, (state, { feedbackId, handleStatus, handleNote }) => ({
    ...state,
    appFeedbacks: [...state.appFeedbacks].map(feedback => {
      if (feedbackId !== feedback.Id) {
        return feedback;
      }

      return { ...feedback, handleStatus, handleNote };
    })
  })),
  on(removeAppFeedbacks, (state, { feedbackIds }) => ({
    ...state,
    appFeedbacks: [
      ...filterArrayByAnotherArray(
        { type: 'object', items: state.appFeedbacks },
        { type: 'none-object', items: feedbackIds },
        { field1: 'Id' }
      )
    ]
  })),

  /**
   * Chatbot feedback
   */
  on(setChatbotFeedbacks, (state, { feedbacks }) => ({ ...state, chatbotFeedbacks: [...feedbacks] })),
  on(handleChatbotFeedback, (state, { feedbackId, handleStatus, handleNote }) => ({
    ...state,
    chatbotFeedbacks: [...state.chatbotFeedbacks].map(feedback => {
      if (feedbackId !== feedback.Id) {
        return feedback;
      }

      return { ...feedback, handleStatus, handleNote };
    })
  })),
  on(removeChatbotFeedbacks, (state, { feedbackIds }) => ({
    ...state,
    chatbotFeedbacks: [
      ...filterArrayByAnotherArray(
        { type: 'object', items: state.chatbotFeedbacks },
        { type: 'none-object', items: feedbackIds },
        { field1: 'Id' }
      )
    ]
  }))
);
