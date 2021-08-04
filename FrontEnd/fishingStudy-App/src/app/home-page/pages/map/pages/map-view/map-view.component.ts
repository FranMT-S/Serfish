import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import { MapService } from '../../services/map.service';
interface Marker {
  color: string;
  id?: string;
  lnglat?: string;
  organizacion?: string;
  newMarker?: mapboxgl.Marker;
}

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit, OnDestroy {
  // 14.643278504196683, -86.64036362081346
  // 14.526323177451724, -86.60740463863459
  @ViewChild("mapa") divMap!: ElementRef;

  mapbox!: mapboxgl.Map
  arrayMarker: Marker[] = []
  zoomLevel: number = 6.5
  center = { lat: 14.526323177451724, lng: -86.60740463863459 }

  constructor(private mapService: MapService) { }

  // Implementamos el onDestroy ya que los eventos pueden seguir emitiendo valores
  // y puede llegar afectar el rendimiendo de la app.
  // En este ejercicio no esta pasando ya que siempre se crea una nueva instancia
  // new mapboxgl.Map pero en otro escenario pordria ser realmente necesario 
  ngOnDestroy(): void {
    this.mapbox.off("zoom", () => { })
    this.mapbox.off("zoomend", () => { })
    this.mapbox.off("move", () => { })
  }

  ngAfterViewInit(): void {
    this.mapbox = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: this.center,
      zoom: this.zoomLevel
    });

    // NOTA: El los eventos de mapbox se puede trabajar
    // con la variable this.mapbox.getCenter() o capturar el
    // valor con el evento disparado con evento.target.getCenter()
    // originalEvent: Evento HTML
    // target: Evento del mapbox.

    this.mapbox.on("zoom", evento => {
      this.zoomLevel = this.mapbox.getZoom();
    })

    this.mapbox.on("zoomend", evento => {
      if (this.mapbox.getZoom() > 18) {
        this.mapbox.zoomTo(18);
      }
    })

    this.mapbox.on("move", evento => {
      this.center = evento.target.getCenter()
    })

    this.mapService.getMarkers()
      .subscribe(res => {
        if(res.ok===true){
          res.markers!.forEach(marker => {
            const newMarker = new mapboxgl.Marker({
              draggable: true,
              color: marker.color
            })
              .setLngLat(JSON.parse(marker.lnglat!))
              .addTo(this.mapbox)
            newMarker.on("dragend", even => {
              const dragendMarker = this.arrayMarker.find(m => m.id == marker.id);
              const { lng, lat } = dragendMarker?.newMarker?.getLngLat()!;
              const body = { lnglat: `[${lng},${lat}]` }
              this.mapService.updateMarker(marker.id!, body)
            })
            this.arrayMarker.push({ newMarker, ...marker })
          })
        }
      })
  }

  zoom(operacion: string) {
    if (operacion === "P") {
      console.log("Sumar")
      this.mapbox.zoomIn();
    }
    else if (operacion === "M") {
      console.log("Restar")
      this.mapbox.zoomOut();
    }
    console.log(this.mapbox.getZoom())
  }

  generalColor(): string {
    var simbolos, color;
    simbolos = "0123456789ABCDEF";
    color = "#";
    for (var i = 0; i < 6; i++) {
      color = color + simbolos[Math.floor(Math.random() * 16)];
    }
    return color
  }
  addMarker() {
    const color = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    console.log("agregando marcador")
    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat(this.center)
      .addTo(this.mapbox)
    this.mapService.newMarker({ color, newMarker })
      .subscribe(res => {
        this.arrayMarker.push({ newMarker, ...res.marker! })
        newMarker.on("dragend", even => {
          const dragend = this.arrayMarker.find(m => m.id == res.marker?.id)
          const { lng, lat } = dragend?.newMarker?.getLngLat()!;
          const body = { lnglat: `[${lng},${lat}]` }
          this.mapService.updateMarker(res.marker?.id!, body)
        })
      })
  }

  flyTo(index: number) {
    console.log(this.arrayMarker[index])
    this.mapbox.flyTo({
      center: this.arrayMarker[index].newMarker!.getLngLat(),
      zoom: 14
    });
  }
  removeMarker(index: number) {
    this.arrayMarker[index].newMarker!.remove();
    this.mapService.deleteMarker(this.arrayMarker[index].id!)
    this.arrayMarker.splice(index, 1);
  }
}
