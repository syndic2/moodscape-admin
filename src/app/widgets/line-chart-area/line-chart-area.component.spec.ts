import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartAreaComponent } from './line-chart-area.component';

describe('LineChartAreaComponent', () => {
  let component: LineChartAreaComponent;
  let fixture: ComponentFixture<LineChartAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineChartAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
