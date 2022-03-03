import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { fetchHandleAppFeedback } from 'src/app/store/actions/feedback.actions';

@Component({
  selector: 'app-feedback-handle-modal',
  templateUrl: './app-feedback-handle-modal.component.html',
  styleUrls: ['./app-feedback-handle-modal.component.scss']
})
export class AppFeedbackHandleModalComponent implements OnInit {
  public handleNote: string;

  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<AppFeedbackHandleModalComponent>
  ) { }

  ngOnInit(): void {
    if (this.data.feedback.handleNote) {
      this.handleNote = this.data.feedback.handleNote;
    }
  }

  onHandle(handleStatus: 'NO_ACTION' | 'ON_CHECK' | 'COMPLETE') {
    this.store.dispatch(fetchHandleAppFeedback({
      feedbackId: this.data.feedback.Id,
      handleStatus: handleStatus,
      handleNote: this.handleNote
    }));
    this.matDialogRef.close();
  }

  onSave() {
    this.store.dispatch(fetchHandleAppFeedback({
      feedbackId: this.data.feedback.Id,
      handleStatus: this.data.handleStatus,
      handleNote: this.handleNote
    }));
    this.matDialogRef.close();
  }
}
