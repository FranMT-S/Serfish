import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentHoursDaysWeather, CurrentWeather } from '../interfaces/climate';
import { Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ClimateService {
  private _baseUrl:string = "https://api.openweathermap.org/data/2.5";
  private _lat:string ="14.1";
  private _lon:string ="-87.2167";
  private _exclude:string ="minutely,alerts";
  private _appid:string ="90b92f0c5ee2d6c71c554b178ff6e3f5";

  currentHoursDaysWeather!:CurrentHoursDaysWeather;

  constructor( private http:HttpClient ) { }
  
  getWeatherCurrent(): Observable<CurrentWeather>{
    const params = `lat=${this._lat}&lon=${this._lon}&appid=${this._appid}`;
    const url = `${this._baseUrl}/weather?${params}`;
    return this.http.get<CurrentWeather>(url)
  }

  getWeatherCurrentHoursDays():Observable<CurrentHoursDaysWeather>{
    const params = `lat=${this._lat}&lon=${this._lon}&exclude=${this._exclude}&appid=${this._appid}`;
    const url = `${this._baseUrl}/onecall?${params}`;
    return this.http.get<CurrentHoursDaysWeather>(url)
  }
}




// async getWeatherHoursDays():Promise<CurrentHoursDaysWeather>{
//   return await new Promise( resolve => {
//     fetch("https://api.openweathermap.org/data/2.5/onecall?lat=14.1&lon=-87.2167&exclude=minutely,alerts&appid=90b92f0c5ee2d6c71c554b178ff6e3f5") 
//       .then(resp => resp.json())
//       .then(body => resolve(body))
//   });
// }

// async getWeatherCurrent():Promise<CurrentWeather>{
//   return await new Promise( resolve => {
//     fetch("https://api.openweathermap.org/data/2.5/weather?lat=14.1&lon=-87.2167&appid=90b92f0c5ee2d6c71c554b178ff6e3f5") 
//       .then(resp => resp.json())
//       .then(body => resolve(body))
//   });
// }
