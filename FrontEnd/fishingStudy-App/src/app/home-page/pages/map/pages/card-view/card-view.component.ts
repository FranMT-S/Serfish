import { Component, AfterViewInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { tap, switchMap } from 'rxjs/operators';

interface Propiedad {
  color: string;
  titulo: string;
  lngLat: number[];
  descripcion?: string;
}

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements AfterViewInit {

  propiedades: Propiedad[] = [
    // {
    //   titulo: 'Casa residencial, Canadá',
    //   descripcion: 'Bella propiedad en Katana, Canadá',
    //   lngLat: [ -75.92722289474008, 45.280015511264466]
    // },
    // {
    //   titulo: 'Casa de playa, México',
    //   descripcion: 'Hermosa casa de playa en Acapulco, México',
    //   lngLat: [ -99.91287720907991, 16.828940930185748]
    // },
    // {
    //   titulo: 'Apartamento, Argentina',
    //   descripcion: 'Lujoso apartamento en el corazón de Buenos Aires, Argentina',
    //   lngLat: [ -58.430166677283445, -34.57150108832866 ]
    // },
    // {
    //   titulo: 'Local comercial, España',
    //   descripcion: 'Local comercial disponible en Madrid, España, cerca de El Jardín Secreto.',
    //   lngLat: [ -3.7112735618380177, 40.42567285425766 ]
    // },
  ]
  cargando:boolean=true;
  constructor(private mapService: MapService) { }

  ngAfterViewInit(): void {
    // var prueba = ''
    // this.mapService.getMarkers()
    //   .subscribe(res => {
    //     res.markers?.forEach(marker => {
    //       const [lng, lat] = JSON.parse(marker.lnglat!)
    //       this.mapService.getPlaceName(lng, lat).subscribe(res => {
    //         prueba = (res.features[0]?.place_name || "")
    //         this.propiedades.push({
    //           color: marker.color,
    //           titulo: prueba,
    //           descripcion: "Lujoso apartamento en el corazón de Buenos Aires, Argentina",
    //           lngLat: JSON.parse(marker.lnglat!)
    //         })
    //       })
    //     })
    //   })
    var arrayCoordenadas: any = []
    this.mapService.getMarkers()
      .pipe(
        tap(res => {
          res.markers?.forEach(marker => {
            const [lng, lat] = JSON.parse(marker.lnglat!)
            arrayCoordenadas.push({lng, lat, markerColor: marker.color})
          })
        }),
        switchMap(res =>{
          return this.mapService.getAllPlaceName(arrayCoordenadas)
        })
      ).subscribe(dataPlaces=>{
        dataPlaces.forEach(data=>{
          this.propiedades.push({
                      color:data.markerColor||"",
                      titulo:data.features[0].place_name,
                      lngLat: [data.query[0],data.query[1]]
                    })
        })
        this.cargando=false;
      })
  }

}
