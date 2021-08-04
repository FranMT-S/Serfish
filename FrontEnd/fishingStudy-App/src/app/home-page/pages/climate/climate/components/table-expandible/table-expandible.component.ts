import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Current, Daily } from '../../../interfaces/climate';
import { Input } from '@angular/core';

import { ClimateService } from '../../../services/climate.service';


interface weatherData {
  icon: string;
  nameData: string;
  data: string;
}

@Component({
  selector: 'app-table-expandible',
  templateUrl: './table-expandible.component.html',
  styleUrls: ['./table-expandible.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})



export class TableExpandibleComponent implements OnInit {
  // Pipes

  dataDays:Daily[]  = []
  dataReady:boolean=false;

  columnsToDisplayDay = ['dt', 'temp', 'humidity','weather'];
  expandedElement:boolean = true;

  //[dia][columna][filas]
  weatherCurrentData:weatherData[][][] = [];
  constructor(private climateServices:ClimateService) { }

  async ngOnInit() {

    
    await this.climateServices.getWeatherCurrentHoursDays()
    this.dataDays=this.climateServices.getWeatherDaysData.slice(1,8);
    this.dataReady = this.climateServices.dataReady;
    


    // console.log(this.dataDays)
    this.dataDays.forEach( 
      (dayData,i) => {
        // Este push simboliza un dia
        this.weatherCurrentData.push(
          // Este arreglo posee las columnas 
          [
            // Estos arreglo posee las filas
            [
              { icon: "fas fa-wind fa-2x me-2", nameData: "Viento.", data: `${dayData.wind_speed} km/h` },
              { icon: "fas fa-sun fa-2x me-2", nameData: "UV.", data: `${dayData.uvi}` },

            ],
            [
              { icon: "fas fa-compress-arrows-alt fa-2x me-2", nameData: "Presion.", data: `${dayData.pressure} hPa` },
              { icon: "fas fa-cloud fa-2x me-2", nameData: "Nubes.", data: `${dayData.clouds} %` },
               
            ]
          ]
        )
      }
    )

    // console.log(this.weatherCurrentData)
  }



  
}
