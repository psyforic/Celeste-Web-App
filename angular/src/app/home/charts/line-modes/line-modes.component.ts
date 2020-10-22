import { UserModeListDto, UserDtoListResultDto, ModeStatsDto } from './../../../../shared/service-proxies/service-proxies';
import { ModeListDto, UserDto } from '@shared/service-proxies/service-proxies';
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
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  modeCount = new Array<number>(7).fill(0, 0, 7);
  modes: ModeStatsDto[] = [];
  ngOnInit() {
    this.initChart();
  }
  initChart() {
    this.chartOptions = {
      series: [
        {
          name: 'Modes',
          data: this.modeCount
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
        categories: this.days
      }
    };
  }
  getData(data: ModeStatsDto[]) {
    this.modes = data;
    if (this.modes.length > 0) {
      this.modes.forEach(x => {
        this.modeCount[x.day] = x.count;
      });
      this.initChart();
    }
  }
}
