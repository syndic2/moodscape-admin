import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbacksAppComponent } from './feedbacks-app.component';

describe('FeedbacksAppComponent', () => {
  let component: FeedbacksAppComponent;
  let fixture: ComponentFixture<FeedbacksAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbacksAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbacksAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
