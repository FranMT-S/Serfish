import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgsRevealModule } from 'ngx-scrollreveal';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { PrimengModule } from '../primeng/primeng.module';
import { MaterialModule } from '../material/material/material.module';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingComponent } from './landing/landing.component';
import { HeaderComponent } from './components/header/header.component';
import { SectionAboutComponent } from './components/section-about/section-about.component';
import { SectionFunctionComponent } from './components/section-function/section-function.component';
import { SharedModule } from '../shared/shared.module';
import { SectionPlansComponent } from './components/section-plans/section-plans.component';
import { FooterComponent } from './components/footer/footer.component';
import { SectionContactUsComponent } from './components/section-contact-us/section-contact-us.component';


@NgModule({
  declarations: [
    LandingComponent,
    HeaderComponent,
    SectionAboutComponent,
    SectionFunctionComponent,
    SectionPlansComponent,
    FooterComponent,
    SectionContactUsComponent
  ],
  exports:[
    LandingComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    SharedModule,
    MaterialModule,
    PrimengModule,
    NgsRevealModule,
    NgScrollbarModule
  ]
})
export class LandingPageModule { }
