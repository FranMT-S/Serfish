import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { BiologicalDataProcess } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private _baseURL = environment.baseUrl
  constructor(private http:HttpClient) { }

  getBiologicalDate(){
    const url = `${this._baseURL}/datos-biologicos`
    const headers = new HttpHeaders()
      .append('x-token', localStorage.getItem('token') || '')
      .append('nombreCientifico',"Centropomus undecimalis")
    return this.http.get<BiologicalDataProcess>(url,{headers})
  }
}
