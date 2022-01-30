import { Injectable } from '@angular/core';

import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, exhaustMap } from 'rxjs/operators';

import { fetchTotalMoodGroupByType, fetchMoodsGrowthByYear, setTotalMoodGroupByType, setMoodsGrowthByYear } from '../actions/mood.action';
import { MoodService } from 'src/app/services/mood/mood.service';

@Injectable()
export class MoodEffects {
  getTotalMoodGroupByType$ = createEffect(() => this.actions.pipe(
    ofType(fetchTotalMoodGroupByType),
    exhaustMap(() => this.moodService.getTotalMoodGroupByType().pipe(
      map(res => setTotalMoodGroupByType({ totalMoodGroupByType: res }))
    ))
  ));

  getMoodsGrowthByYear$ = createEffect(() => this.actions.pipe(
    ofType(fetchMoodsGrowthByYear),
    exhaustMap(({ startDate, endDate }) => this.moodService.getMoodsGrowthByYear(startDate, endDate).pipe(
      map(res => setMoodsGrowthByYear({ moodsGrowthByYear: res }))
    ))
  ));

  constructor(private actions: Actions, private moodService: MoodService) { }
}

