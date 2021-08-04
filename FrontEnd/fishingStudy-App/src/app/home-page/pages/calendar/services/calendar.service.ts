import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Evento, ShowEvent } from '../interfaces/event';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private _baseUrl:string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  registerEvent( form:FormGroup ){

    const url = `${this._baseUrl}/calendar`
    const body = form.value;
    return this.http.post<Evento>(url, body);
  }

  getEvents(){
    const url = `${this._baseUrl}/calendar`;
    return  this.http.get<{events:Evento[]}>(url)
  }

  getEventPlan(){
    const url = `${this._baseUrl}/calendar`;
    return  this.http.get<{events:ShowEvent[]}>(url);
  }
}
