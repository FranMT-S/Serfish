import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClimateRoutingModule } from './climate-routing.module';
import { ClimateComponent } from './climate/climate.component';
import { MaterialModule } from '../../../material/material/material.module';
import { PrimengModule } from '../../../primeng/primeng.module';
import { KelvilCelsiusPipe } from './pipes/kelvil-celsius.pipe';
import { UnixTimePipe } from './pipes/unix-time.pipe';
import { MsKmhPipe } from './pipes/ms-kmh.pipe';
import { CodeImgPipe } from './pipes/code-img.pipe';

@NgModule({
  declarations: [
    ClimateComponent,
    KelvilCelsiusPipe,
    UnixTimePipe,
    MsKmhPipe,
    CodeImgPipe
  ],
  imports: [
    CommonModule,
    ClimateRoutingModule,
    MaterialModule,
    PrimengModule
  ]
})
export class ClimateModule { }
