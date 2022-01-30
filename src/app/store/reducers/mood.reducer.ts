import { createReducer, on } from '@ngrx/store';

import { MoodState } from '../states';
import { setTotalMoodGroupByType, setMoodsGrowthByYear } from '../actions/mood.action';

const initialState: MoodState = {
  totalMoodGroupByType: null,
  moodsGrowtByYear: []
};

export const moodReducer = createReducer(
  initialState,
  on(setTotalMoodGroupByType, (state, { totalMoodGroupByType }) => ({ ...state, totalMoodGroupByType: totalMoodGroupByType })),

  on(setMoodsGrowthByYear, (state, { moodsGrowthByYear }) => ({ ...state, moodsGrowtByYear: moodsGrowthByYear }))
);
