import { AppComponentBase } from '@shared/app-component-base';
import { browser } from 'protractor';
import { animate } from '@angular/animations';
import { UserModeListDto, UserDtoListResultDto, ModeStatsDto, CelesteDashboardServiceProxy } from './../../../../shared/service-proxies/service-proxies';
import { ModeListDto, UserDto } from '@shared/service-proxies/service-proxies';
import { Component, OnInit, ViewChild, Input, Injector, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
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

})
export class LineModesComponent extends AppComponentBase implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('lineChart', { static: true }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> ;
  @Input()
  modeNames = [];
  @Input()
  modeCount = new Array<number>(5).fill(0, 0, 5);
  @Input()
  modes: ModeStatsDto[] = [];
  isLoading = false;
  constructor(
    injector: Injector,
  ) {
    super(injector);

  }
  ngAfterViewInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.modes.currentValue) {
      this.modes = changes.modes.currentValue;
    }
  }
  ngOnInit() {
    if (this.modeNames.length > 0) {
      // this.chartOptions.series[0].data = this.modeCount;
      this.initChart(this.modeCount, this.modeNames);
    }
  }
  initChart(dataset: number[], categories: string[]) {
    this.chartOptions = {
      series: [
        {
          name: 'Modes',
          data: dataset
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
        categories: categories,
      },
      yaxis: {
        min: 0
      }
    };
  }

}
