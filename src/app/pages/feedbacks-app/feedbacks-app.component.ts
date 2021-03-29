import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-feedbacks-app',
  templateUrl: './feedbacks-app.component.html',
  styleUrls: ['./feedbacks-app.component.scss']
})
export class FeedbacksAppComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Umpan Balik Aplikasi');
  }

  ngOnInit(): void {
  }
}
