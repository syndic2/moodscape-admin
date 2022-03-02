import { createReducer, on } from '@ngrx/store';

import { filterArrayByAnotherArray } from 'src/app/utilities/helpers';
import { FeedbackState } from '../states';
import {
  setAppFeedbacks,
  setAppFeedbacksGroupByRating,
  setAppFeedbacksGrowthByYear,
  removeAppFeedbacks,

  setChatbotFeedbacks,
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
