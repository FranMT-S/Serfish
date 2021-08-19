import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey/survey.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material/material.module';
import { PrimengModule } from 'src/app/primeng/primeng.module';

@NgModule({
  declarations: [
    SurveyComponent
  ],
  imports: [
    CommonModule,
    SurveyRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    PrimengModule
  ]
})
export class SurveyModule { }
