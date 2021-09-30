import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppFeedback } from 'src/app/models/feedback.model';
import { showDialog } from 'src/app/store/actions/application.actions';
import { fetchAppFeedbacks, removeAppFeedbacksConfirmation } from 'src/app/store/actions/feedback.actions';
import { getAppFeedbacks } from 'src/app/store/selectors/feedback.selectors';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { AppFeedbackDetailModalComponent } from '../app-feedback-detail-modal/app-feedback-detail-modal.component';

@Component({
  selector: 'list-app-feedback',
  templateUrl: './list-app-feedback.component.html',
  styleUrls: ['./list-app-feedback.component.scss']
})
export class ListAppFeedbackComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public tableColumns: string[]= ['position', 'user', 'rating', 'featureCategory', 'createdAt_date', 'createdAt_time', 'actions'];
  public tableDataSource: MatTableDataSource<AppFeedback>;
  private getAppFeedbacksSubscription: Subscription;

  constructor(private store: Store, public utilitiesService: UtilitiesService) { }

  ngOnInit(): void {
    this.getAppFeedbacksSubscription= this.store.select(getAppFeedbacks).subscribe(res => {
      if (!res.length) {
        this.loadAppFeedbacks();
      } else {
        this.tableDataSource= new MatTableDataSource([...res]);
        this.tableDataSource.sort = this.sort;
        this.tableDataSource.paginator = this.paginator;
      }
    });
  }

  ngOnDestroy() {
    this.getAppFeedbacksSubscription && this.getAppFeedbacksSubscription.unsubscribe();
  }

  loadAppFeedbacks() {
    this.store.dispatch(fetchAppFeedbacks());
  }

  onSearch(event: Event) {
    const field= (event.target as HTMLInputElement).value;
    this.tableDataSource.filter= field.trim().toLowerCase();

    if (this.tableDataSource.paginator) this.tableDataSource.paginator.firstPage();
  }

  onView(feedback: AppFeedback) {
    this.store.dispatch(showDialog({
      component: AppFeedbackDetailModalComponent,
      config: {
        maxWidth: '50%',
        data: {
          feedback: feedback
        }
      }
    }))
  }

  onRemove(feedback: AppFeedback) {
    this.store.dispatch(removeAppFeedbacksConfirmation({ feedbackIds: [feedback.Id] }));
  }
}
