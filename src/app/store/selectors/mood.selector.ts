import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StoreFeatureKeys } from '../feature-keys';
import { MoodState } from '../states';

const selectMoodFeature = createFeatureSelector<MoodState>(StoreFeatureKeys.MOOD);

export const getTotalMoodGroupByType = createSelector(
  selectMoodFeature,
  state => state.totalMoodGroupByType
);

export const getMoodsGrowthByYear = createSelector(
  selectMoodFeature,
  state => state.moodsGrowtByYear
);
