import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-app-feedback-detail-modal',
  templateUrl: './app-feedback-detail-modal.component.html',
  styleUrls: ['./app-feedback-detail-modal.component.scss']
})
export class AppFeedbackDetailModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
}
