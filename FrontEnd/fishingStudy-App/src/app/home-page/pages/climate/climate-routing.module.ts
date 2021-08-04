import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClimateComponent } from './climate/climate.component';
import { TableExpandibleComponent } from './climate/components/table-expandible/table-expandible.component';

const routes: Routes = [
  {
    path:"",
    component:ClimateComponent,
    pathMatch:"full"
  },
  {
    path:"table-8-days",
    component: TableExpandibleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClimateRoutingModule { }
