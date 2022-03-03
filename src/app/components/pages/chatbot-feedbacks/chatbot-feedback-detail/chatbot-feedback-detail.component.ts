import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';

import { showDialog } from 'src/app/store/actions/application.actions';

@Component({
  selector: 'chatbot-feedback-detail',
  templateUrl: './chatbot-feedback-detail.component.html',
  styleUrls: ['./chatbot-feedback-detail.component.scss']
})
export class ChatbotFeedbackDetailComponent implements OnInit {

  constructor(
    private store: Store,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

  async onHandle(handleStatus: 'NO_ACTION' | 'ON_CHECK' | 'COMPLETE') {
    const { ChatbotFeedbackHandleModalModule } = await import('../chatbot-feedback-handle-modal/chatbot-feedback-handle-modal.module');

    this.store.dispatch(showDialog({
      component: ChatbotFeedbackHandleModalModule.getComponent(),
      config: {
        width: '35%',
        maxWidth: '50%',
        data: { feedback: this.data.feedback, handleStatus }
      }
    }));
  }
}
