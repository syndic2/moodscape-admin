import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartStatComponent } from './line-chart-stat.component';

describe('LineChartStatComponent', () => {
  let component: LineChartStatComponent;
  let fixture: ComponentFixture<LineChartStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineChartStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
