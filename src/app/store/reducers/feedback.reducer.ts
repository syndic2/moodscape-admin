import { createReducer, on } from '@ngrx/store';

import { filterArrayByAnotherArray } from 'src/app/utilities/helpers';
import { FeedbackState } from '../states';
import { setAppFeedbacks, setAppFeedbacksGroupByRating, setAppFeedbacksGrowthByYear, removeAppFeedbacks } from '../actions/feedback.actions';

const initialState: FeedbackState= {
  appFeedbacks: [],
  appFeedbacksGroupByRating: null,
  appFeedbackGrowthByYear: []
};

export const feedbackReducer= createReducer(
  initialState,
  /**
   * Chatbot feedback
   */

  /**
   * App feedback 
   */
  on(setAppFeedbacks, (state, { feedbacks }) => ({ ...state, appFeedbacks: [...feedbacks] })),

  on(setAppFeedbacksGroupByRating, (state, { feedbacksGroupByRating }) => ({ ...state, appFeedbacksGroupByRating: feedbacksGroupByRating })),

  on(setAppFeedbacksGrowthByYear, (state, { feedbacks }) =>  ({ ...state, appFeedbackGrowthByYear: [...feedbacks] })),

  on(removeAppFeedbacks, (state, { feedbackIds }) => ({
    ...state,
    appFeedbacks: [
      ...filterArrayByAnotherArray(
        { type: 'object', items: state.appFeedbacks },
        { type: 'none-object', items: feedbackIds },
        { field1: 'Id' }
      )
    ]
  }))
);