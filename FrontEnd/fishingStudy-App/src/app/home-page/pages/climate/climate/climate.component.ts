import { Component, OnInit } from '@angular/core';
import { ClimateService } from '../services/climate.service';
import { CurrentWeather, CurrentHoursDaysWeather, Current, Daily } from '../interfaces/climate';
import { KelvilCelsiusPipe } from '../pipes/kelvil-celsius.pipe';
import { MsKmhPipe } from '../pipes/ms-kmh.pipe';


interface weatherData {
  icon: string;
  nameData: string;
  data: string;
}

@Component({
  selector: 'app-climate',
  templateUrl: './climate.component.html',
  styleUrls: ['./climate.component.css']
})
export class ClimateComponent implements OnInit {

  // Se hace una inicializacion con data en la interfaz para no mostrar errores en la consola.
  // No es la solucion mas elegante pero tampoco la peor.

  
  


  currentWeather: CurrentWeather = {
    "coord": {
      "lon": -87.2167,
      "lat": 14.1
    },
    "weather": [
      {
        "id": 803,
        "main": "Clouds",
        "description": "broken clouds",
        "icon": "04d"
      }
    ],
    "base": "stations",
    "main": {
      "temp": 299.09,
      "feels_like": 299.15,
      "temp_min": 298.79,
      "temp_max": 299.4,
      "pressure": 1020,
      "humidity": 54
    },
    "visibility": 10000,
    "wind": {
      "speed": 3.58,
      "deg": 40,
      "gust": 0
    },
    "clouds": {
      "all": 75
    },
    "dt": 1627059983,
    "sys": {
      "type": 2,
      "id": 2000378,
      "country": "HN",
      "sunrise": 1627039834,
      "sunset": 1627085989
    },
    "timezone": -21600,
    "id": 3613314,
    "name": "Comayagüela",
    "cod": 200
  };
  currentHours: Date = new Date();
  currentHoursDaysWeather!: CurrentHoursDaysWeather;
  weatherHoursData: Current[] = [];
  weatherDaysData: Daily[] = [];
  weatherCurrentData: weatherData[][] = [];
  dataReady:boolean=false;
  // Uso de Pipes en el ts
  kelvilCelsiu = new KelvilCelsiusPipe();
  msKmhPipe = new MsKmhPipe();

  
  

  expandedElement: weatherData | null = null;

  constructor(private climateService: ClimateService) { 
    
 
  }

  async ngOnInit(
  ) {
    
    this.climateService.getWeatherCurrent()
      .subscribe(resp => {
        this.currentWeather = resp;
      });

    await this.climateService.getWeatherCurrentHoursDays()
    this.currentHoursDaysWeather = this.climateService.getCurrentHoursDaysWeather

    this.weatherHoursData = this.climateService.weatherHoursData.slice(0, 6)
    this.weatherDaysData  = this.climateService.getWeatherDaysData.slice(0, 4)
    this.weatherCurrentData = [
      [
        {
          icon: "fas fa-temperature-low fa-2x me-2",
          nameData: "Máx./Min.",
          data: `${this.kelvilCelsiu.transform(this.currentWeather.main.temp_max)}° / ${this.kelvilCelsiu.transform(this.currentWeather.main.temp_min)}°`
        },
        {
          icon: "fas fa-tint fa-2x me-2",
          nameData: "Humedad.",
          data: `${this.currentWeather.main.humidity} %`
        },
        {
          icon: "fas fa-compress-arrows-alt fa-2x me-2",
          nameData: "Presión.",
          data: `${this.currentWeather.main.pressure}.0 hPa`
        }
      ],
      [
        {
          icon: "fas fa-wind fa-2x me-2",
          nameData: "Viento.",
          data: `${this.msKmhPipe.transform(this.currentWeather.wind.speed)} km/h`
        },
        {
          icon: "fas fa-tint fa-2x me-2",
          nameData: "Punto de rocio.",
          data: `${this.kelvilCelsiu.transform(this.currentHoursDaysWeather.current?.dew_point || 0)}°`
        },
        {
          icon: "fas fa-eye fa-2x me-2",
          nameData: "Visibilidad.",
          data: `${this.currentWeather.visibility / 1000} km`
        }
      ]
    ]
    setInterval(() => {
      this.currentHours = new Date();
    }, 1000)

    this.dataReady = this.climateService.dataReady;
    this.expandedElement = this.weatherCurrentData[0][0];
  }

  
}















      // this.currentHoursDaysWeather = currentHoursDaysWeather;
      // Forma 2 usando then
      // await this.climateService.getWeatherCurrentHoursDaysP().then(resolve=>{
      //    this.currentHoursDaysWeather = resolve;
      //    console.log(this.currentHoursDaysWeather)
      // })
            // this.climateService.getWeatherCurrentHoursDays()
      //   .subscribe( resp =>{
      //       this.currentHoursDaysWeather = resp;
      //       // console.log(resp)
      //   });

      // const currentWeather = await this.climateService.getWeatherCurrentP()
      // this.currentWeather = current;
      // Forma 1 usando await
      // const currentHoursDaysWeather = await this.climateService.getWeatherCurrentHoursDays()
      // this.weatherHoursData = this.currentHoursDaysWeather.hourly?.slice(0,6)||[];
      // this.weatherDaysData = this.currentHoursDaysWeather.daily?.slice(0,4)||[]
