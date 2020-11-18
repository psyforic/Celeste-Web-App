import { UserModeListDto, UserDtoListResultDto, ModeStatsDto, CelesteDashboardServiceProxy } from './../../../../shared/service-proxies/service-proxies';
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
  providers: [CelesteDashboardServiceProxy]
})
export class LineModesComponent implements OnInit {
  @ViewChild('lineChart', { static: true }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  modeCount = new Array<number>(7).fill(0, 0, 7);
  modes: ModeStatsDto[] = [];
  // mode: Mode[] = [];
  isLoading = false;
  constructor(private _dashBoardService: CelesteDashboardServiceProxy) {

  }
  ngOnInit() {
    this.initChart();
    this.getModeStats();
  }
  getModeStats() {
    this.isLoading = true;
    this._dashBoardService.getWeeklyModes()
      .pipe(finalize(() => {
        this.isLoading = false;
      })).subscribe(result => {
        this.modes = result.items;
        this.getData(this.modes);
      });
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
        text: 'Used Modes This Week',
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
        this.modeCount[x.count] = x.count;
        console.log(this.modeCount);
      });
      this.initChart();
    }
  }
}
