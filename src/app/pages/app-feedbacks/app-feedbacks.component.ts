import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-feedbacks-app',
  templateUrl: './app-feedbacks.component.html',
  styleUrls: ['./app-feedbacks.component.scss']
})
export class AppFeedbacksComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Umpan Balik Aplikasi');
  }

  ngOnInit(): void {
  }
}
