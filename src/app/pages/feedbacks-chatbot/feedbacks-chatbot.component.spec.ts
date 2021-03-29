import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbacksChatbotComponent } from './feedbacks-chatbot.component';

describe('FeedbacksChatbotComponent', () => {
  let component: FeedbacksChatbotComponent;
  let fixture: ComponentFixture<FeedbacksChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbacksChatbotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbacksChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
