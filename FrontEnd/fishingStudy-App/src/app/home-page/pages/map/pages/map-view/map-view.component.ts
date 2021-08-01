import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken
    var map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/dark-v10'
    });
  }
}
