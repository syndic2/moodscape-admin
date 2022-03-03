import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotFeedbackHandleModalComponent } from './chatbot-feedback-handle-modal.component';

describe('ChatbotFeedbackHandleModalComponent', () => {
  let component: ChatbotFeedbackHandleModalComponent;
  let fixture: ComponentFixture<ChatbotFeedbackHandleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatbotFeedbackHandleModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotFeedbackHandleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
