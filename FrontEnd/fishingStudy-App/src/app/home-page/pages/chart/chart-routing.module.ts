import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { BiologicalDataComponent } from './pages/biological-data/biological-data.component';

const routes: Routes = [
  {
    path:"",
    children:[
      {
        path:"biological-data",
        component:BiologicalDataComponent
      },
      {
        path:"",
        redirectTo:"biological-data",
        pathMatch:"full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartRoutingModule { }
