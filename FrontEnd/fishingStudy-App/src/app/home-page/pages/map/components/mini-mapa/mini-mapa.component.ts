import { Component, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styles: [
    `
      div {
        width: 100%;
        height: 150px;
        margin: 0px;
      }
    `
  ]
})
export class MiniMapaComponent implements AfterViewInit {

  @Input() lnglat: number[] = [0, 0];
  @Input() color:string="";
  @ViewChild('mapa') divMapa!: ElementRef;

  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: {lng:this.lnglat[0],lat:this.lnglat[1]},
      zoom: 10,
      interactive: false
    });

    new mapboxgl.Marker({
      color:this.color
    })
    .setLngLat({lng:this.lnglat[0],lat:this.lnglat[1]})  
    .addTo(map);
  }

}
