import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() view: any[] = [1000, 400];
  @Input() colorScheme = { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] };
  @Input() xAxisLabel: string;
  @Input() yAxisLabel: string;
  @Input() yScaleMin: number = 0;
  @Input() yScaleMax: number = 5;
  @Input() customColors: any;

  // options
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showXAxisLabel = true;
  public showYAxisLabel = true;

  constructor() {
  }

  ngOnInit(): void {
  }
}
