import { Component, OnInit, AfterViewInit} from '@angular/core';
import { ClimateService } from '../services/climate.service';
import { CurrentWeather, CurrentHoursDaysWeather } from '../interfaces/climate';
import { KelvilCelsiusPipe } from '../pipes/kelvil-celsius.pipe';
import { MsKmhPipe } from '../pipes/ms-kmh.pipe';
import { delay } from 'rxjs/operators';
import { async } from '@angular/core/testing';

interface weatherDataaaa{
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
  kelvilCelsiu = new KelvilCelsiusPipe();
  msKmhPipe = new MsKmhPipe();
  wData:weatherDataaaa[][]=[];

  constructor( private climateService:ClimateService ) { }


  ngAfterViewInit(): void {
    setTimeout( ()=>{
      console.log("sad!!!!!!!!!!!!!!!!!!!!!");
      this.currentHoursDaysWeather=this.climateService.currentHoursDaysWeather;
      console.log(this.currentHoursDaysWeather)
      this.wData=[
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
            icon:"fas fa-wind fa-2x  me-2",
            nameData:"Viento.",
            data:`${this.msKmhPipe.transform(this.currentWeather.wind.speed)} km/h`
          },
          {
            icon:"fas fa-tint fa-2x me-2",
            nameData:"Punto de rocio.",
            data:`${"AquiPasaAlgo"}`
          },
          {
            icon:"fas fa-eye fa-2x me-2",
            nameData:"Visibilidad.",
            data:`${ this.currentWeather.visibility/1000} km`
          }
        ]
      ]
      // setTimeout(()=>{
        const {hourly} = this.currentHoursDaysWeather;
        console.log("sad&&&&&&&&&&&&&&&&&&&&&&");
        console.log(`Clima por hora: ${hourly}`)
      // },300);
      //   console.log("sad2");
      //   // console.log(`Clima por hora: ${hourly}`)
    },400)

  }

   ngOnInit():void {
    setTimeout(()=>{
      console.log("OnInitSADDD")
      this.climateService.getWeatherCurrent()
        .subscribe( resp => {
              this.currentWeather = resp;
              console.log(resp);
        });
      this.climateService.getWeatherCurrentHoursDays()
        .subscribe( resp =>{
             this.currentHoursDaysWeather = resp;
            console.log(resp)
        });
      setInterval(()=>{
        this.currentHours= new Date();
      },1000)
      
    },300)
  }

}

