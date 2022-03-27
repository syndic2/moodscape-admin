import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { transformDateTime } from 'src/app/utilities/helpers';
import { fetchUsersGroupByGender, fetchUsersGroupByAge, fetchUsersGrowthByYear } from 'src/app/store/actions/user.actions';
import { getUsersGroupByGender, getUsersGroupByAge, getUsersGrowthByYear } from 'src/app/store/selectors/user.selectors';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'user-graphs',
  templateUrl: './user-graphs.component.html',
  styleUrls: ['./user-graphs.component.scss']
})
export class UserGraphsComponent implements OnInit, OnDestroy {
  public usersGrowthRangePicker: FormGroup;
  public usersGroupByGender: any[] = [];
  public usersGroupByAge: any[] = [];
  public usersGrowthByYear: any[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store, public utilitiesService: UtilitiesService) { }

  ngOnInit(): void {
    this.intializeUsersGrowthRangePicker()
    this.loadData();
    this.processingData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  get startDate() {
    return this.usersGrowthRangePicker.get('startDate');
  }

  get endDate() {
    return this.usersGrowthRangePicker.get('endDate');
  }

  intializeUsersGrowthRangePicker() {
    this.usersGrowthRangePicker = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl()
    });

    const initialStartDate = new Date();
    initialStartDate.setFullYear(initialStartDate.getFullYear() - 1);
    this.startDate.setValue(initialStartDate);
    this.endDate.setValue(new Date());

    const startDateSubscription = this.startDate.valueChanges.subscribe(value => {
      if (value) {
        this.store.dispatch(fetchUsersGrowthByYear({
          startDate: transformDateTime(value).toISODate(),
          endDate: transformDateTime(this.endDate.value).toISODate()
        }));
      }
    });
    this.subscriptions.add(startDateSubscription);

    const endDateSubscription = this.endDate.valueChanges.subscribe(value => {
      if (value) {
        this.store.dispatch(fetchUsersGrowthByYear({
          startDate: transformDateTime(this.startDate.value).toISODate(),
          endDate: transformDateTime(value).toISODate()
        }));
      }
    });
    this.subscriptions.add(endDateSubscription);
  }

  loadData() {
    this.store.dispatch(fetchUsersGroupByGender());
    this.store.dispatch(fetchUsersGroupByAge());
    this.store.dispatch(fetchUsersGrowthByYear({
      startDate: transformDateTime(this.startDate.value).toISODate(),
      endDate: transformDateTime(this.endDate.value).toISODate()
    }));
  }

  processingData() {
    const getUsersGroupByGenderSubscription = this.store.select(getUsersGroupByGender).subscribe(res => {
      if (!res) {
        this.usersGroupByGender = [];
      } else {
        this.usersGroupByGender = [
          { name: "Laki-laki", value: res.males.length },
          { name: "Perempuan", value: res.females.length }
        ];
      }
    });
    this.subscriptions.add(getUsersGroupByGenderSubscription);

    const getUsersGroupByAgeSubscription = this.store.select(getUsersGroupByAge).subscribe(res => {
      if (!res) {
        this.usersGroupByAge = [];
      } else {
        Object.entries(res).forEach(([key, value]) => {
          this.usersGroupByAge.push({
            name: `${res[key].group} (${res[key].range})`,
            value: res[key].users.length
          });
        });
      }
    });
    this.subscriptions.add(getUsersGroupByAgeSubscription);

    const getUsersGrowthByYearSubscription = this.store.select(getUsersGrowthByYear).subscribe(res => {
      if (!res.length) {
        this.usersGrowthByYear = [];
      } else {
        this.usersGrowthByYear = [...res].map((object, index) => ({ name: `${object.monthName}-${object.year}`, value: object.users.length }));
      }
    });
    this.subscriptions.add(getUsersGrowthByYearSubscription);
  }
}
