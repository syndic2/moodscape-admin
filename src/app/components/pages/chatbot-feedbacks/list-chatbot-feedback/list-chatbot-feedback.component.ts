import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ChatbotFeedback } from 'src/app/models/feedback.model';
// import { showDialog } from 'src/app/store/actions/application.actions';
import { fetchChatbotFeedbacks, removeChatbotFeedbacksConfirmation } from 'src/app/store/actions/feedback.actions';
import { getChatbotFeedbacks } from 'src/app/store/selectors/feedback.selectors';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'list-chatbot-feedback',
  templateUrl: './list-chatbot-feedback.component.html',
  styleUrls: ['./list-chatbot-feedback.component.scss']
})
export class ListChatbotFeedbackComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public tableColumns: string[] = ['position', 'user', 'createdAt_date', 'createdAt_time', 'actions'];
  public tableDataSource: MatTableDataSource<ChatbotFeedback>;
  private getChatbotFeedbacksSubscription: Subscription;

  constructor(
    private store: Store,
    private bottomSheet: MatBottomSheet,
    public utilitiesService: UtilitiesService
  ) { }

  ngOnInit(): void {
    this.getChatbotFeedbacksSubscription = this.store.select(getChatbotFeedbacks).subscribe(res => {
      if (!res.length) {
        this.loadChatbotFeedbacks();
      }

      this.tableDataSource = new MatTableDataSource([...res]);
      this.tableDataSource.sort = this.sort;
      this.tableDataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy(): void {
    this.getChatbotFeedbacksSubscription && this.getChatbotFeedbacksSubscription.unsubscribe();
  }

  loadChatbotFeedbacks() {
    this.store.dispatch(fetchChatbotFeedbacks());
  }

  onSearch(event: Event) {
    const field = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = field.trim().toLowerCase();

    if (this.tableDataSource.paginator) this.tableDataSource.paginator.firstPage();
  }

  async onView(feedback: ChatbotFeedback) {
    const { ChatbotFeedbackDetailModule } = await import('../chatbot-feedback-detail/chatbot-feedback-detail.module');

    this.bottomSheet.open(ChatbotFeedbackDetailModule.getComponent(), {
      data: { feedback }
    });
  }

  onRemove(feedback: ChatbotFeedback) {
    this.store.dispatch(removeChatbotFeedbacksConfirmation({ feedbackIds: [feedback.Id] }));
  }
}
