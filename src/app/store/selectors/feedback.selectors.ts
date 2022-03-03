import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StoreFeatureKeys } from '../feature-keys';
import { FeedbackState } from '../states';

const selectFeedbackFeature = createFeatureSelector<FeedbackState>(StoreFeatureKeys.FEEDBACK);

/**
 * App feedback
 */
export const getAppFeedbacks = (handleStatus: string) => createSelector(
  selectFeedbackFeature,
  state => [...state.appFeedbacks].filter(feedback => {
    if (feedback.handleStatus) {
      if (feedback.handleStatus === handleStatus) {
        return feedback;
      }
    } else {
      if (handleStatus === 'NO_ACTION') {
        return feedback;
      }
    }
  })
);

export const getAppFeedbacksGroupByRating = createSelector(
  selectFeedbackFeature,
  state => state.appFeedbacksGroupByRating
);

export const getAppFeedbacksGrowthByYear = createSelector(
  selectFeedbackFeature,
  state => state.appFeedbackGrowthByYear
);

export const getAppFeedback = (props) => {
  return createSelector(
    getAppFeedbacks(props.handleStatus),
    state => state.find(feedback => feedback.Id === props.Id)
  );
};

/**
 * Chatbot feedback
 */
export const getChatbotFeedbacks = (handleStatus: string) => createSelector(
  selectFeedbackFeature,
  state => [...state.chatbotFeedbacks].filter(feedback => {
    if (feedback.handleStatus) {
      if (feedback.handleStatus === handleStatus) {
        return feedback;
      }
    } else {
      if (handleStatus === 'NO_ACTION') {
        return feedback;
      }
    }
  })
);


