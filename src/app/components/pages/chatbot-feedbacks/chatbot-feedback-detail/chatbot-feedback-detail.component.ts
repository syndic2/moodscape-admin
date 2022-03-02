import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'chatbot-feedback-detail',
  templateUrl: './chatbot-feedback-detail.component.html',
  styleUrls: ['./chatbot-feedback-detail.component.scss']
})
export class ChatbotFeedbackDetailComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private bottomSheetRef: MatBottomSheetRef) { }

  ngOnInit(): void {
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

  onHandle() {

  }

  onDone() {

  }
}
