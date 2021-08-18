import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartComponent } from './chart/chart.component';

import { ChartRoutingModule } from './chart-routing.module';
import { ChartsModule } from 'ng2-charts';
import { BiologicalDataComponent } from './pages/biological-data/biological-data.component';
import { MaterialModule } from '../../../material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChartComponent,
    BiologicalDataComponent
  ],
  imports: [
    CommonModule,
    ChartRoutingModule,
    MaterialModule,
    ChartsModule,
    ReactiveFormsModule
  ]
})
export class ChartModule { }
