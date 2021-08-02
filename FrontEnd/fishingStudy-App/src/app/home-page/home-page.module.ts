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


@NgModule({
  declarations: [
    HomeComponent,
    SettingComponent,
    OpeningComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    PrimengModule
  ]
})
export class HomePageModule { }
