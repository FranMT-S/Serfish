import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapViewComponent } from './pages/map-view/map-view.component';
import { CardViewComponent } from './pages/card-view/card-view.component';

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "map-view", component: MapViewComponent },
      { path: "card-view", component: CardViewComponent },
      { path: "", redirectTo: "map-view", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
