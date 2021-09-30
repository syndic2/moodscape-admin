import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppFeedbackComponent } from './list-app-feedback.component';

describe('ListAppFeedbackComponent', () => {
  let component: ListAppFeedbackComponent;
  let fixture: ComponentFixture<ListAppFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAppFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAppFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
