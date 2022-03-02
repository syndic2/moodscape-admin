import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotFeedbacksComponent } from './chatbot-feedbacks.component';

describe('ChatbotFeedbacksComponent', () => {
  let component: ChatbotFeedbacksComponent;
  let fixture: ComponentFixture<ChatbotFeedbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatbotFeedbacksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
