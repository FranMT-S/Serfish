import { Component, OnInit, AfterViewInit} from '@angular/core';
import { ClimateService } from '../services/climate.service';
import { CurrentWeather, CurrentHoursDaysWeather, Current, Daily } from '../interfaces/climate';
import { KelvilCelsiusPipe } from '../pipes/kelvil-celsius.pipe';
import { MsKmhPipe } from '../pipes/ms-kmh.pipe';

interface weatherData{
  icon:string;
  nameData:string;
  data:string;
}

@Component({
  selector: 'app-climate',
  templateUrl: './climate.component.html',
  styleUrls: ['./climate.component.css']
})
export class ClimateComponent implements OnInit, AfterViewInit {

  currentHours:Date= new Date();
  currentWeather!:CurrentWeather;
  currentHoursDaysWeather!:CurrentHoursDaysWeather;
  
  weatherCurrentData:weatherData[][]=[];
  weatherHoursData:Current[]=[];
  weatherDaysData:Daily[]=[];

  kelvilCelsiu = new KelvilCelsiusPipe();
  msKmhPipe = new MsKmhPipe();


  constructor( private climateService:ClimateService ) { }


  ngAfterViewInit(): void {
    setTimeout( ()=>{
      console.log(this.currentHoursDaysWeather)
      this.weatherHoursData = this.currentHoursDaysWeather.hourly.slice(0,6);
      this.weatherDaysData = this.currentHoursDaysWeather.daily.slice(0,4)
      this.weatherCurrentData=[
        [
          {
            icon:"fas fa-temperature-low fa-2x me-2",
            nameData:"Máx./Min.",
            data:`${this.kelvilCelsiu.transform(this.currentWeather.main.temp_max)}° / ${this.kelvilCelsiu.transform(this.currentWeather.main.temp_min)}°`
          },
          {
            icon:"fas fa-tint fa-2x me-2",
            nameData:"Humedad.",
            data:`${ this.currentWeather.main.humidity} %`
          },
          {
            icon:"fas fa-compress-arrows-alt fa-2x me-2",
            nameData:"Presión.",
            data:`${this.currentWeather.main.pressure}.0 hPa`
          }
        ],
        [
          {
            icon:"fas fa-wind fa-2x me-2",
            nameData:"Viento.",
            data:`${this.msKmhPipe.transform(this.currentWeather.wind.speed)} km/h`
          },
          {
            icon:"fas fa-tint fa-2x me-2",
            nameData:"Punto de rocio.",
            data:`${this.kelvilCelsiu.transform(this.currentHoursDaysWeather.current.dew_point)}°`
          },
          {
            icon:"fas fa-eye fa-2x me-2",
            nameData:"Visibilidad.",
            data:`${ this.currentWeather.visibility/1000} km`
          }
        ]
      ]
    },400)

  }

   ngOnInit():void {
    setTimeout(()=>{
      this.climateService.getWeatherCurrent()
        .subscribe( resp => {
              this.currentWeather = resp;
              // console.log(resp);
        });
      this.climateService.getWeatherCurrentHoursDays()
        .subscribe( resp =>{
             this.currentHoursDaysWeather = resp;
            // console.log(resp)
        });
      setInterval(()=>{
        this.currentHours= new Date();
      },1000)
      
    },300)
  }

}

