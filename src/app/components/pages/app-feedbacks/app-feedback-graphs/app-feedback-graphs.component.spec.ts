import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFeedbackGraphsComponent } from './app-feedback-graphs.component';

describe('AppFeedbackGraphsComponent', () => {
  let component: AppFeedbackGraphsComponent;
  let fixture: ComponentFixture<AppFeedbackGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppFeedbackGraphsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFeedbackGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
