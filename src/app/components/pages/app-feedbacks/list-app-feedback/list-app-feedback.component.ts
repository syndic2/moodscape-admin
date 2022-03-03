import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppFeedback } from 'src/app/models/feedback.model';
import { showDialog } from 'src/app/store/actions/application.actions';
import { fetchAppFeedbacks, removeAppFeedbacksConfirmation } from 'src/app/store/actions/feedback.actions';
import { getAppFeedbacks } from 'src/app/store/selectors/feedback.selectors';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'list-app-feedback',
  templateUrl: './list-app-feedback.component.html',
  styleUrls: ['./list-app-feedback.component.scss']
})
export class ListAppFeedbackComponent implements OnInit, OnDestroy {
  @Input() handleStatus: string = 'NO_ACTION';
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public tableColumns: string[] = [
    'position',
    'user',
    'email',
    'rating',
    'featureCategory',
    'createdAt_date',
    'createdAt_time',
    'actions'
  ];
  public tableDataSource: MatTableDataSource<AppFeedback>;
  private getAppFeedbacksSubscription: Subscription;

  constructor(
    private store: Store,
    private matDialog: MatDialog,
    public utilitiesService: UtilitiesService
  ) { }

  ngOnInit(): void {
    this.getAppFeedbacksSubscription = this.store.select(getAppFeedbacks(this.handleStatus)).subscribe(res => {
      if (!res.length) {
        this.loadAppFeedbacks();
      }

      this.tableDataSource = new MatTableDataSource([...res]);
      this.tableDataSource.sort = this.sort;
      this.tableDataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy() {
    this.getAppFeedbacksSubscription && this.getAppFeedbacksSubscription.unsubscribe();
  }

  loadAppFeedbacks() {
    this.store.dispatch(fetchAppFeedbacks());
  }

  onSearch(event: Event) {
    const field = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = field.trim().toLowerCase();

    if (this.tableDataSource.paginator) this.tableDataSource.paginator.firstPage();
  }

  async onView(feedback: AppFeedback) {
    const { AppFeedbackDetailModalModule } = await import('../app-feedback-detail-modal/app-feedback-detail-modal.module');

    this.store.dispatch(showDialog({
      component: AppFeedbackDetailModalModule.getComponent(),
      config: {
        maxWidth: '50%',
        data: {
          feedback: feedback
        }
      }
    }))
  }

  async onHandle(feedback: AppFeedback) {
    const { AppFeedbackHandleModalModule } = await import('../app-feedback-handle-modal/app-feedback-handle-modal.module');

    this.matDialog.open(AppFeedbackHandleModalModule.getComponent(), {
      width: '35%',
      maxWidth: '50%',
      data: { feedback, handleStatus: this.handleStatus }
    });
  }

  onRemove(feedback: AppFeedback) {
    this.store.dispatch(removeAppFeedbacksConfirmation({ feedbackIds: [feedback.Id] }));
  }
}
