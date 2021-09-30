import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFeedbacksComponent } from './app-feedbacks.component';

describe('AppFeedbacksComponent', () => {
  let component: AppFeedbacksComponent;
  let fixture: ComponentFixture<AppFeedbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppFeedbacksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
