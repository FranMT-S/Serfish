import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClimateComponent } from './climate/climate.component';
import { TableExpandiblehoursComponent } from './climate/components/table-expandiblehours/table-expandiblehours.component';

const routes: Routes = [
  {
    path:"",
    component:ClimateComponent,
    pathMatch:"full"
  },
  {
    path: "table-expandiblehours",
    component:TableExpandiblehoursComponent



  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClimateRoutingModule { }
