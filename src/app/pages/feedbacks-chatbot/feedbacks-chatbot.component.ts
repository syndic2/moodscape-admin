import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-feedbacks-chatbot',
  templateUrl: './feedbacks-chatbot.component.html',
  styleUrls: ['./feedbacks-chatbot.component.scss']
})
export class FeedbacksChatbotComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Umpan Balik Chatbot');
  }

  ngOnInit(): void {
  }
}
