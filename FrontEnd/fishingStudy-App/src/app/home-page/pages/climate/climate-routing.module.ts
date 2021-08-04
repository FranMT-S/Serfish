import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClimateComponent } from './climate/climate.component';
import { DaysTableComponent } from './components/days-table/days-table.component';
import { HoursTableComponent } from './components/hours-table/hours-table.component';

const routes: Routes = [
  {
    path:"",
    component:ClimateComponent,
    pathMatch:"full"
  },
  {
    path: "table-expandiblehours",
    component:HoursTableComponent

  },
  {
    path:"table-8-days",
    component: DaysTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClimateRoutingModule { }
