import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChatbotFeedbackComponent } from './list-chatbot-feedback.component';

describe('ListChatbotFeedbackComponent', () => {
  let component: ListChatbotFeedbackComponent;
  let fixture: ComponentFixture<ListChatbotFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChatbotFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChatbotFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
