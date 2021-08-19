import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Evento, EventResponse, registerResponse } from '../interfaces/event';
import { catchError, map } from "rxjs/operators";
import { of } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private _baseUrl:string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  registerEvent( form:FormGroup ){

    const url = `${this._baseUrl}/calendar`
    const body = form.value;
    const headers = new HttpHeaders()
      .append('x-token', localStorage.getItem('token') || '')
    return this.http.post<registerResponse>(url, body, { headers })
    .pipe(
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    );;
  }

  getEvents(eventid?:string){
    const url = `${this._baseUrl}/calendar`;
    const headers = new HttpHeaders()
    .append('x-token', localStorage.getItem('token') || '')
    .append('eventId', eventid || '')
    return  this.http.get<EventResponse>(url,{headers});
  }
  
  updateEvent(body:Evento){
    
    const url = `${this._baseUrl}/calendar/${body._id}`;
    const headers = new HttpHeaders()
      .append('x-token', localStorage.getItem('token') || '')
    return this.http.put<registerResponse>(url, body, {headers})
      .pipe(
        map(resp => {
          return resp.ok
        }),
        catchError((err) => {
          return of(err.error?.msg || "Error en la petición")
        })
      );
  }

  deleteEvent(event: Evento) {
    const url = `${this._baseUrl}/calendar/${event._id}`;
    const headers = new HttpHeaders()
      .append('x-token', localStorage.getItem('token') || '')
    return this.http.delete(url, { headers });
  }
  
}
