import { Component, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts';

@Component({
  selector: 'LineChartArea',
  templateUrl: './line-chart-area.component.html',
  styleUrls: ['./line-chart-area.component.scss']
})
export class LineChartAreaComponent implements OnInit {
  public Highcharts= Highcharts;
  public chartOptions= {};

  constructor() { }

  ngOnInit(): void {
    this.chartOptions= {
      chart: {
          type: 'area'
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
          valueSuffix: ' millions'
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
      series: [
        {
          name: 'Asia',
          data: [502, 635, 809, 947, 1402, 3634, 5268]
        },
        {
          name: 'Africa',
          data: [106, 107, 111, 133, 221, 767, 1766]
        },
        {
          name: 'Europe',
          data: [163, 203, 276, 408, 547, 729, 628]
        },
        {
          name: 'America',
          data: [18, 31, 54, 156, 339, 818, 1201]
        },
        {
          name: 'Oceania',
          data: [2, 2, 2, 6, 13, 30, 46]
        }
      ]
    };
  }
}
