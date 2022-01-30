import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { transformDateTime } from 'src/app/utilities/helpers';
import { MOOD_EMOTICON_COLORS } from 'src/app/models/mood.model';
import { fetchTotalMoodGroupByType, fetchMoodsGrowthByYear } from 'src/app/store/actions/mood.action';
import { getTotalMoodGroupByType, getMoodsGrowthByYear } from 'src/app/store/selectors/mood.selector';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'mood-graphs',
  templateUrl: './mood-graphs.component.html',
  styleUrls: ['./mood-graphs.component.scss']
})
export class MoodGraphsComponent implements OnInit, OnDestroy {
  public moodsGrowthRangePicker: FormGroup;
  public totalMoodGroupByType: any[] = [];
  public moodsGrowthByYear: any[] = [];
  public moodColorSchemes: string[] = [
    MOOD_EMOTICON_COLORS.GEMBIRA,
    MOOD_EMOTICON_COLORS.SENANG,
    MOOD_EMOTICON_COLORS.NETRAL,
    MOOD_EMOTICON_COLORS.SEDIH,
    MOOD_EMOTICON_COLORS.BURUK
  ];
  public moodsGrowthByYearCustomColors: { name: string, value: any }[] = [];
  private getTotalMoodGroupBTypeSubscription: Subscription;
  private getMoodsGrowthByYearSubscription: Subscription;

  constructor(private store: Store, public utilitiesService: UtilitiesService) { }

  ngOnInit(): void {
    this.intializeMoodsGrowthRangePicker()
    this.loadData();
    this.processingData();
  }

  ngOnDestroy(): void {
    this.getTotalMoodGroupBTypeSubscription && this.getTotalMoodGroupBTypeSubscription.unsubscribe();
    this.getMoodsGrowthByYearSubscription && this.getMoodsGrowthByYearSubscription.unsubscribe();
  }

  get startDate() {
    return this.moodsGrowthRangePicker.get('startDate');
  }

  get endDate() {
    return this.moodsGrowthRangePicker.get('endDate');
  }

  intializeMoodsGrowthRangePicker() {
    this.moodsGrowthRangePicker = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl()
    });

    const initialStartDate = new Date();
    initialStartDate.setFullYear(initialStartDate.getFullYear() - 1);
    this.startDate.setValue(initialStartDate);
    this.endDate.setValue(new Date());

    this.endDate.valueChanges.subscribe(value => {
      if (value) {
        this.store.dispatch(fetchMoodsGrowthByYear({
          startDate: transformDateTime(this.startDate.value).toISODate(),
          endDate: transformDateTime(value).toISODate()
        }));
      }
    })
  }

  loadData() {
    this.store.dispatch(fetchTotalMoodGroupByType());
    this.store.dispatch(fetchMoodsGrowthByYear({
      startDate: transformDateTime(this.startDate.value).toISODate(),
      endDate: transformDateTime(this.endDate.value).toISODate()
    }));
  }

  processingData() {
    this.getTotalMoodGroupBTypeSubscription = this.store.select(getTotalMoodGroupByType).subscribe(res => {
      if (!res) {
        this.totalMoodGroupByType = [];
      } else {
        const legends = ['Gembira', 'Senang', 'Netral', 'Sedih', 'Buruk'];

        Object.entries(res).forEach(([key, value], index) => {
          this.totalMoodGroupByType.push({
            name: `${legends[index]} (${Math.abs(index + -5)})`,
            value: value
          });
        });
      }
    });

    this.getMoodsGrowthByYearSubscription = this.store.select(getMoodsGrowthByYear).subscribe(res => {
      if (!res.length) {
        this.moodsGrowthByYear = [];
      } else {
        this.moodsGrowthByYear = [...res].map((object, index) => ({ name: object.month, value: object.moodAverage }));
        this.moodsGrowthByYear.forEach(moodGrowth => {
          if (moodGrowth.value === 1) this.moodsGrowthByYearCustomColors.push({ name: moodGrowth.name, value: MOOD_EMOTICON_COLORS.BURUK });
          else if (moodGrowth.value === 2) this.moodsGrowthByYearCustomColors.push({ name: moodGrowth.name, value: MOOD_EMOTICON_COLORS.SEDIH });
          else if (moodGrowth.value === 3) this.moodsGrowthByYearCustomColors.push({ name: moodGrowth.name, value: MOOD_EMOTICON_COLORS.NETRAL });
          else if (moodGrowth.value === 3) this.moodsGrowthByYearCustomColors.push({ name: moodGrowth.name, value: MOOD_EMOTICON_COLORS.NETRAL });
          else if (moodGrowth.value === 4) this.moodsGrowthByYearCustomColors.push({ name: moodGrowth.name, value: MOOD_EMOTICON_COLORS.SENANG });
          else if (moodGrowth.value === 5) this.moodsGrowthByYearCustomColors.push({ name: moodGrowth.name, value: MOOD_EMOTICON_COLORS.GEMBIRA });
        });
      }
    });
  }
}
