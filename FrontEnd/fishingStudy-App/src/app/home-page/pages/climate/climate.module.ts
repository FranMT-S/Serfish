import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClimateRoutingModule } from './climate-routing.module';
import { ClimateComponent } from './climate/climate.component';
import { MaterialModule } from '../../../material/material/material.module';
import { KelvilCelsiusPipe } from './pipes/kelvil-celsius.pipe';
import { UnixTimePipe } from './pipes/unix-time.pipe';
import { MsKmhPipe } from './pipes/ms-kmh.pipe';
import { CodeImgPipe } from './pipes/code-img.pipe';
import { TranslateDescWeatherPipe } from './pipes/translate-desc-weather.pipe';
import { DaysTableComponent } from './components/days-table/days-table.component';
import { HoursTableComponent } from './components/hours-table/hours-table.component';

@NgModule({
  declarations: [
    ClimateComponent,
    KelvilCelsiusPipe,
    UnixTimePipe,
    MsKmhPipe,
    CodeImgPipe,
    TranslateDescWeatherPipe,
    DaysTableComponent,
    HoursTableComponent
  ],
  imports: [
    CommonModule,
    ClimateRoutingModule,
    MaterialModule
  ]
})
export class ClimateModule { }
