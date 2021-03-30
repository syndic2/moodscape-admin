import { Component, OnInit, Input } from '@angular/core';

import * as Highcharts from 'highcharts';

@Component({
  selector: 'LineChartStat',
  templateUrl: './line-chart-stat.component.html',
  styleUrls: ['./line-chart-stat.component.scss']
})
export class LineChartStatComponent implements OnInit {
  @Input() label: string;
  @Input() total: number;
  @Input() percentage: number;

  public Highcharts= Highcharts;
  public chartOptions= {};

  constructor() { }

  ngOnInit(): void {
    this.chartOptions= {
      chart: {
          type: 'area',
          backgroundColor: null,
          borderWidth: 0,
          margin: [2, 2, 2, 2],
          height: 70
      },
      title: {
          text: null
      },
      subtitle: {
          text: null
      },
      credits: {
        enabled: false
      },
      tooltip: {
          split: true,
          outside: true
      },
      legend: {
        enabled: false
      },
      plotOptions: {
          area: {
              stacking: 'normal',
              lineColor: '#666666',
              lineWidth: 1,
              marker: {
                  lineWidth: 1,
                  lineColor: '#666666'
              }
          }
      },
      series: [{
        data: [71, 78, 39, 66]
      }]
    };
  }
}
