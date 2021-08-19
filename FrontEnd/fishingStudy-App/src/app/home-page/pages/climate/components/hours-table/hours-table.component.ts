import { Component, Input, OnInit } from '@angular/core';

import { Current } from '../../interfaces/climate';
import { ClimateService } from '../../services/climate.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
interface weatherData {
  icon: string;
  nameData: string;
  data: string;
}
@Component({
  selector: 'app-hours-table',
  templateUrl: './hours-table.component.html',
  styleUrls: ['./hours-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HoursTableComponent implements OnInit {

  // Pipes


  dataDays: Current[] = []
  @Input() DaysOrHours: String = "Hours"
  @Input() dataDay!: Current[];
  columnsToDisplayDay = ['dt', 'temp', 'humidity', 'weather'];
  dataReady:boolean=false;
  expandedElement: boolean = true;
    //[dia][columna][filas]
    weatherCurrentData: weatherData[][][] = [];

  constructor(private climateServices: ClimateService) { }

  async ngOnInit() {
    await this.climateServices.getWeatherCurrentHoursDays()
    this.dataDays = this.climateServices.getWeatherHoursData.slice(1, 48)
    this.dataReady = this.climateServices.dataReady;
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

  }

}
