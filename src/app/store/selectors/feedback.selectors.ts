import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StoreFeatureKeys } from '../feature-keys';
import { FeedbackState } from '../states';

const selectFeedbackFeature= createFeatureSelector<FeedbackState>(StoreFeatureKeys.FEEDBACK);

/**
 * Chatbot feedback
 */


/**
 * App feedback
 */
export const getAppFeedbacks= createSelector(
  selectFeedbackFeature,
  state => state.appFeedbacks 
);

export const getAppFeedbacksGroupByRating= createSelector(
  selectFeedbackFeature,
  state => state.appFeedbacksGroupByRating
);

export const getAppFeedbacksGrowthByYear= createSelector(
  selectFeedbackFeature,
  state => state.appFeedbackGrowthByYear
);

export const getAppFeedback= (props) => {
  return createSelector(
    getAppFeedbacks,
    state => state.find((feedback, index) => feedback.Id === props.Id)
  );
};