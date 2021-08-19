import { Component, OnInit } from '@angular/core';
import { NgsRevealModule } from 'ngx-scrollreveal';
import * as mapboxgl from 'mapbox-gl'

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgsRevealModule] // add NgsRevealConfig to the component providers
})
export class AppComponent implements OnInit{
  title = 'fishingStudy-App';
  
  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken
  }
}
