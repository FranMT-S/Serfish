import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { MiniMapaComponent } from './components/mini-mapa/mini-mapa.component';
import { MapViewComponent } from './pages/map-view/map-view.component';
import { CardViewComponent } from './pages/card-view/card-view.component';


@NgModule({
  declarations: [
    MiniMapaComponent,
    MapViewComponent,
    CardViewComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule
  ]
})
export class MapModule { }
