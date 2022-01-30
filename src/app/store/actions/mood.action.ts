import { createAction, props } from '@ngrx/store';

import { TotalMoodGroupByType, MoodsGrowthByYear } from '../../models/mood.model';

//Fetch API
export const fetchTotalMoodGroupByType = createAction('[Mood/API] Get mood total group by type');

export const fetchMoodsGrowthByYear = createAction(
  '[Mood/API] Get moods growth by year',
  props<{ startDate: string, endDate: string }>()
);

//STORE
export const setTotalMoodGroupByType = createAction(
  '[Mood/STORE] Set total mood group by type',
  props<{ totalMoodGroupByType: TotalMoodGroupByType }>()
);

export const setMoodsGrowthByYear = createAction(
  '[Mood/STORE] Set moods growth by year',
  props<{ moodsGrowthByYear: MoodsGrowthByYear[] }>()
);
