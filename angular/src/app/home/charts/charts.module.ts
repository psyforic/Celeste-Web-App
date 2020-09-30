import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts.component';
import { LineModesComponent } from './line-modes/line-modes.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  declarations: [
    ChartsComponent,
    LineModesComponent],
  exports: [
    LineModesComponent]
})
export class ChartsModule { }
