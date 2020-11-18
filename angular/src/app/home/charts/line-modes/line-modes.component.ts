import { browser } from 'protractor';
import { animate } from '@angular/animations';
import { UserModeListDto, UserDtoListResultDto, ModeStatsDto, CelesteDashboardServiceProxy } from './../../../../shared/service-proxies/service-proxies';
import { ModeListDto, UserDto } from '@shared/service-proxies/service-proxies';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexGrid,
  ApexStroke,
  ApexTitleSubtitle,
  ChartComponent,
  ApexMarkers,
  ApexAnnotations,
  ApexFill
} from 'ng-apexcharts';
import { finalize } from 'rxjs/operators';

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  annotations: ApexAnnotations;
  fill: ApexFill;
  markers: ApexMarkers;
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
  modeNames = [];
  modeCount = new Array<number>(5).fill(0, 0, 5);
  modes: ModeStatsDto[] = [];
  isLoading = false;
  constructor(private dashBoardService: CelesteDashboardServiceProxy) { }
  ngOnInit() {
    this.getData();
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
        height: 350,
        type: 'line',
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Most Used Modes this Week',
        align: 'center'
      },
      fill: {
        type: 'gradient'
      },
      markers: {
        size: 5,
        shape: 'circle',
        colors: ['#035F58', 'transparent']
      },
      grid: {
        row: {
          colors: ['#FFFF', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        type: 'category',
        categories: this.modeNames,
      },
      yaxis: {
        min: 0
      }
    };
  }
  getData() {
    this.isLoading = true;
    this.dashBoardService.getWeeklyModes()
      .pipe(finalize(() => {
        this.initChart();
        this.isLoading = false;
      }))
      .subscribe((res) => {
        this.modes = res.items;
        if (this.modes.length > 0) {
          this.modes.forEach((mode, index) => {
            this.modeNames[index] = mode.name;
            this.modeCount[index] = mode.count;
          });
        }
      });
  }

}
