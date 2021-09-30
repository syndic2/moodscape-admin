import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFeedbackDetailModalComponent } from './app-feedback-detail-modal.component';

describe('AppFeedbackDetailModalComponent', () => {
  let component: AppFeedbackDetailModalComponent;
  let fixture: ComponentFixture<AppFeedbackDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppFeedbackDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFeedbackDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
