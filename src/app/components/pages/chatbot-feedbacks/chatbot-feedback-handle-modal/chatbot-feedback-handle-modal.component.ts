import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { fetchHandleChatbotFeedback } from 'src/app/store/actions/feedback.actions';

@Component({
  selector: 'chatbot-feedback-handle-modal',
  templateUrl: './chatbot-feedback-handle-modal.component.html',
  styleUrls: ['./chatbot-feedback-handle-modal.component.scss']
})
export class ChatbotFeedbackHandleModalComponent implements OnInit {
  public handleNote: string;

  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<ChatbotFeedbackHandleModalComponent>,
  ) { }

  ngOnInit(): void {
    if (this.data.feedback.handleNote) {
      this.handleNote = this.data.feedback.handleNote;
    }
  }

  onHandle() {
    this.store.dispatch(fetchHandleChatbotFeedback({
      feedbackId: this.data.feedback.Id,
      handleStatus: this.data.handleStatus,
      handleNote: this.handleNote
    }));
    this.matDialogRef.close();
  }
}
