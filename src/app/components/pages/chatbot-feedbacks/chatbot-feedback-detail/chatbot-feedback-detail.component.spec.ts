import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotFeedbackDetailComponent } from './chatbot-feedback-detail.component';

describe('ChatbotFeedbackDetailComponent', () => {
  let component: ChatbotFeedbackDetailComponent;
  let fixture: ComponentFixture<ChatbotFeedbackDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatbotFeedbackDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotFeedbackDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
