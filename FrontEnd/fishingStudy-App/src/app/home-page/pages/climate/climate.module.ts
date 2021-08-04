import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClimateRoutingModule } from './climate-routing.module';
import { ClimateComponent } from './climate/climate.component';
import { MaterialModule } from '../../../material/material/material.module';
import { KelvilCelsiusPipe } from './pipes/kelvil-celsius.pipe';
import { UnixTimePipe } from './pipes/unix-time.pipe';
import { MsKmhPipe } from './pipes/ms-kmh.pipe';
import { CodeImgPipe } from './pipes/code-img.pipe';
import { TableExpandibleComponent } from './climate/components/table-expandible/table-expandible.component';
import { TableExpandiblehoursComponent } from './climate/components/table-expandiblehours/table-expandiblehours.component';
import { TranslateDescWeatherPipe } from './pipes/translate-desc-weather.pipe';

@NgModule({
  declarations: [
    ClimateComponent,
    KelvilCelsiusPipe,
    UnixTimePipe,
    MsKmhPipe,
    CodeImgPipe,
    TableExpandibleComponent,
    TableExpandiblehoursComponent,
    TranslateDescWeatherPipe
  ],
  imports: [
    CommonModule,
    ClimateRoutingModule,
    MaterialModule
  ]
})
export class ClimateModule { }
