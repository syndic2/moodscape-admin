import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodGraphsComponent } from './mood-graphs.component';

describe('MoodGraphsComponent', () => {
  let component: MoodGraphsComponent;
  let fixture: ComponentFixture<MoodGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoodGraphsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
