import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomeComponent } from './home/home.component';
import { SettingComponent } from './pages/setting/setting.component';
import { SharedModule } from '../shared/shared.module';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { OpeningComponent } from './pages/opening/opening.component';
import { MaterialModule } from '../material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    SettingComponent,
    OpeningComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class HomePageModule { }
