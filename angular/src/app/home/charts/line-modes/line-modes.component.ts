import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexGrid,
  ApexStroke,
  ApexTitleSubtitle,
  ChartComponent
} from 'ng-apexcharts';
import { finalize } from 'rxjs/operators';

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
}
@Component({
  selector: 'app-line-modes',
  templateUrl: './line-modes.component.html',
  styleUrls: ['./line-modes.component.scss'],
})
export class LineModesComponent implements OnInit {
  @ViewChild('lineChart', { static: true }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  ngOnInit() {
    this.initChart();
  }
  initChart() {
    this.chartOptions = {
      series: [
        {
          name: 'Modes',
          data: [2, 5, 8, 9, 10, 12, 4, 19, 11, 8, 9, 12]
        }
      ],
      chart: {
        height: 280,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Used Modes Per Month',
        align: 'center'
      },
      grid: {
        row: {
          colors: ['#FFFFFF', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: this.months
      }
    };
  }
  // getData(data: QuotationStatDto[]) {
  //   this.list = data;
  //   if (this.list.length > 0) {
  //     this.list.forEach(x => {
  //       this.quotations[x.month - 1]++;
  //     });
  //     this.initChart();
  //   }
  // }
}
