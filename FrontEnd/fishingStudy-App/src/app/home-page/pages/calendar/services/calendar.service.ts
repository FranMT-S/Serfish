import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { HttpClient,HttpHeaders } from '@angular/common/http';
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
    const headers = new HttpHeaders()
      .append('x-token', localStorage.getItem('token') || '')
    return this.http.post<Evento>(url, body,{headers});
  }

  getEvents(){
    const url = `${this._baseUrl}/calendar`;
    const headers = new HttpHeaders()
    .append('x-token', localStorage.getItem('token') || '')
    return  this.http.get<{events:Evento[]}>(url,{headers});
  }
  
  updateEvent(body: Evento){
    const url = `${this._baseUrl}/usuarios/updateUser`;
    const headers = new HttpHeaders()
      .append('x-token', localStorage.getItem('token') || '')
    return this.http.put<Evento>(url, body, {headers})
  }

  deleteEvent(event: Evento) {
    const url = `${this._baseUrl}/calendar/${event._id}`;
    const headers = new HttpHeaders()
      .append('x-token', localStorage.getItem('token') || '')
    return this.http.delete(url, { headers });
  }
  
  getEventPlan(){
    const url = `${this._baseUrl}/calendar`;
    const headers = new HttpHeaders()
    .append('x-token', localStorage.getItem('token') || '')
   
    return  this.http.get<Evento>(url,{headers});
  }
}
