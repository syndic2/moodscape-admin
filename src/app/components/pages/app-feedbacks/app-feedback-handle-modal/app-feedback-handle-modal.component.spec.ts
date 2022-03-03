import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFeedbackHandleModalComponent } from './app-feedback-handle-modal.component';

describe('AppFeedbackHandleModalComponent', () => {
  let component: AppFeedbackHandleModalComponent;
  let fixture: ComponentFixture<AppFeedbackHandleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppFeedbackHandleModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFeedbackHandleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
