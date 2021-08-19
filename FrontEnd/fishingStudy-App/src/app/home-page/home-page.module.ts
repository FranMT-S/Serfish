import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from '../material/material/material.module';
import { PrimengModule } from '../primeng/primeng.module'
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomeComponent } from './home/home.component';
import { SettingComponent } from './pages/setting/setting.component';
import { SharedModule } from '../shared/shared.module';
import { OpeningComponent } from './pages/opening/opening.component';
import { TableComponent } from './pages/setting/components/table/table.component';
import { CodeImgPipe } from './pages/climate/pipes/code-img.pipe';
import { KelvilCelsiusPipe } from './pages/climate/pipes/kelvil-celsius.pipe';
import { MsKmhPipe } from './pages/climate/pipes/ms-kmh.pipe';
import { TranslateDescWeatherPipe } from './pages/climate/pipes/translate-desc-weather.pipe';
import { UnixTimePipe } from './pages/climate/pipes/unix-time.pipe';







@NgModule({
  declarations: [
    HomeComponent,
    SettingComponent,
    OpeningComponent,
    TableComponent,
    CodeImgPipe,
    KelvilCelsiusPipe,
    MsKmhPipe,
    TranslateDescWeatherPipe,
    UnixTimePipe,
    



  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    PrimengModule
  ],
  exports:[
    CodeImgPipe,
    KelvilCelsiusPipe,
    MsKmhPipe,
    TranslateDescWeatherPipe,
    UnixTimePipe

  ]
})
export class HomePageModule { }
