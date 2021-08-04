import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { MiniMapaComponent } from './components/mini-mapa/mini-mapa.component';
import { MapViewComponent } from './pages/map-view/map-view.component';
import { CardViewComponent } from './pages/card-view/card-view.component';
import { MaterialModule } from '../../../material/material/material.module';

@NgModule({
  declarations: [
    MiniMapaComponent,
    MapViewComponent,
    CardViewComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    MaterialModule
  ]
})
export class MapModule { }
