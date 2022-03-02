import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { transformDateTime } from 'src/app/utilities/helpers';
import { AppFeedbacksGroupByRating } from 'src/app/models/feedback.model';
import { fetchAppFeedbacksByRating, fetchAppFeedbacksGrowthByYear } from 'src/app/store/actions/feedback.actions';
import { getAppFeedbacksGroupByRating, getAppFeedbacksGrowthByYear } from 'src/app/store/selectors/feedback.selectors';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'app-feedback-graphs',
  templateUrl: './app-feedback-graphs.component.html',
  styleUrls: ['./app-feedback-graphs.component.scss']
})
export class AppFeedbackGraphsComponent implements OnInit, OnDestroy {
  public appFeedbacksGrowthRangePicker: FormGroup;
  public appFeedbacksGroupByRating: any[] = [];
  public appFeedbacksGroupByRatingCards: AppFeedbacksGroupByRating;
  public appFeedbacksGrowthByYear: any[] = [];
  public pieChartColors: string[] = ['#3CB403', '#B4CC4E', '#FFD300', '#FFC30B', '#D0312D'];
  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store, public utilitiesService: UtilitiesService) { }

  ngOnInit(): void {
    this.intializeAppFeedbacksGrowthRangePicker();
    this.processData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get startDate() {
    return this.appFeedbacksGrowthRangePicker.get('startDate');
  }

  get endDate() {
    return this.appFeedbacksGrowthRangePicker.get('endDate');
  }

  intializeAppFeedbacksGrowthRangePicker() {
    this.appFeedbacksGrowthRangePicker = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl()
    });

    const initialStartDate = new Date();
    initialStartDate.setFullYear(initialStartDate.getFullYear() - 1);
    this.startDate.setValue(initialStartDate);
    this.endDate.setValue(new Date());

    const endDateSubscription = this.endDate.valueChanges.subscribe(value => {
      if (value) {
        this.store.dispatch(fetchAppFeedbacksGrowthByYear({
          startDate: transformDateTime(this.startDate.value).toISODate(),
          endDate: transformDateTime(value).toISODate()
        }));
      }
    });
    this.subscriptions.add(endDateSubscription);
  }

  loadData() {
    this.store.dispatch(fetchAppFeedbacksByRating());
    this.store.dispatch(fetchAppFeedbacksGrowthByYear({
      startDate: transformDateTime(this.startDate.value).toISODate(),
      endDate: transformDateTime(this.endDate.value).toISODate()
    }));
  }

  processData() {
    const getAppFeedbacksGroupByRatingSubscription = this.store.select(getAppFeedbacksGroupByRating).subscribe(res => {
      if (!res) {
        this.store.dispatch(fetchAppFeedbacksByRating());
      } else {
        this.appFeedbacksGroupByRatingCards = { ...res };
        Object.entries(res).forEach(([key, value]) => {
          this.appFeedbacksGroupByRating.push({ name: value.group, value: value.users.length });
        });
      }
    });
    this.subscriptions.add(getAppFeedbacksGroupByRatingSubscription);

    const getAppFeedbacksGrowthByYearSubscription = this.store.select(getAppFeedbacksGrowthByYear).subscribe(res => {
      if (!res.length) {
        this.store.dispatch(fetchAppFeedbacksGrowthByYear({
          startDate: transformDateTime(this.startDate.value).toISODate(),
          endDate: transformDateTime(this.endDate.value).toISODate()
        }));
      } else {
        this.appFeedbacksGrowthByYear = [...res].map((object, index) => ({ name: object.month, value: object.averageRating }));
      }
    });
    this.subscriptions.add(getAppFeedbacksGrowthByYearSubscription);
  }
}
