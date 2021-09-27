import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @Input() data: any[];
  @Input() view: any[] = [undefined, 300];
  @Input() colorScheme;

  // options
  public gradient: boolean = true;
  public showLegend: boolean = true;
  public showLabels: boolean = true;
  public isDoughnut: boolean = false;
  public legendPosition: string = 'right';

  constructor() { 
  }

  ngOnInit(): void {
  }
}
