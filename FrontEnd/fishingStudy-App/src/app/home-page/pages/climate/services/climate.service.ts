import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentHoursDaysWeather, CurrentWeather, Daily, Current } from '../interfaces/climate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClimateService {
  private _baseUrl: string = "https://api.openweathermap.org/data/2.5";
  private _lat: string = "14.1";
  private _lon: string = "-87.2167";
  // 14.065589474799324, -87.17750973447704 coordenadas tegucigalpa
  private _exclude: string = "minutely,alerts";
  private _appid: string = "90b92f0c5ee2d6c71c554b178ff6e3f5";
  dataReady:boolean=false;

  currentHoursDaysWeather!: CurrentHoursDaysWeather;
  weatherHoursData:Current[]=[];
  weatherDaysData:Daily[]=[];

  get getCurrentHoursDaysWeather(){
    return {...this.currentHoursDaysWeather}
  }
  get getWeatherHoursData(){
    return [...this.weatherHoursData]
  }
  get getWeatherDaysData(){
    return [...this.weatherDaysData]
  }

  constructor(private http: HttpClient) { }

  getWeatherCurrent(): Observable<CurrentWeather> {
    const params = `lat=${this._lat}&lon=${this._lon}&appid=${this._appid}`;
    const url = `${this._baseUrl}/weather?${params}`;
    return this.http.get<CurrentWeather>(url)
  }

  getWeatherCurrentHoursDays(): Promise<CurrentHoursDaysWeather> {
    return new Promise(resolve => {
      const params = `lat=${this._lat}&lon=${this._lon}&exclude=${this._exclude}&appid=${this._appid}`;
      const url = `${this._baseUrl}/onecall?${params}`;
      fetch(url)
        .then(resp => resp.json())
        .then(body => {
          this.currentHoursDaysWeather=body;
          this.weatherHoursData = body.hourly!
          this.weatherDaysData  = body.daily!
          this.dataReady=true;
          resolve(body)
      })
    });
  }

}















// getWeatherCurrentP(): Promise<CurrentWeather> {
//   return new Promise(resolve => {
//     fetch("https://api.openweathermap.org/data/2.5/weather?lat=14.1&lon=-87.2167&appid=90b92f0c5ee2d6c71c554b178ff6e3f5")
//       .then(resp => resp.json())
//       .then(body => resolve(body))
//   });
// }

// getWeatherCurrentHoursDays(): Observable<CurrentHoursDaysWeather> {
//   const params = `lat=${this._lat}&lon=${this._lon}&exclude=${this._exclude}&appid=${this._appid}`;
//   const url = `${this._baseUrl}/onecall?${params}`;
//   return this.http.get<CurrentHoursDaysWeather>(url)
//     .pipe(
//       tap( resp => {
//         this.currentHoursDaysWeather=resp;
//         this.weatherHoursData = resp.hourly!
//         this.weatherDaysData  = resp.daily!
//         console.log(this.weatherDaysData)
//       })
//     )
// }