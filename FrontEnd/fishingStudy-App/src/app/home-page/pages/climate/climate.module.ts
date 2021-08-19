import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClimateRoutingModule } from './climate-routing.module';
import { ClimateComponent } from './climate/climate.component';
import { MaterialModule } from '../../../material/material/material.module';
import { DaysTableComponent } from './components/days-table/days-table.component';
import { HoursTableComponent } from './components/hours-table/hours-table.component';
import { HomePageModule } from '../../home-page.module';

@NgModule({
  declarations: [
    ClimateComponent,
   
 DaysTableComponent,
    HoursTableComponent
  ],
  imports: [
    CommonModule,
    ClimateRoutingModule,
    MaterialModule,
    HomePageModule
    
  ]
})
export class ClimateModule { }

