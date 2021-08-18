import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ResponseCommonScientificName, ResponseForkLengthAndIndividual, ResponseLabelYearMonth, ResponseDataActivityMonth, FishName } from '../interfaces/interfaces';
import { combineLatest, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private _baseURL = environment.baseUrl
  constructor(private http: HttpClient) { }

  getForkLengthIndividuals(name: string) {
    const url = `${this._baseURL}/biological-data/forklength-individuals`
    const headers = new HttpHeaders()
      .append('x-token', localStorage.getItem('token') || '')
      .append('nombreCientifico', name)
    return this.http.get<ResponseForkLengthAndIndividual>(url, { headers })
  }

  getScientificCommunName() {
    const url = `${this._baseURL}/biological-data/common-scientific-name`;
    const headers = new HttpHeaders()
      .append('x-token', localStorage.getItem('token') || '');
    return this.http.get<ResponseCommonScientificName>(url, { headers });
  }

  getLabelActivityMonth() {
    const url = `${this._baseURL}/survey/label-activity-month`;
    const headers = new HttpHeaders()
      .append('x-token', localStorage.getItem('token') || '')
    return this.http.get<ResponseLabelYearMonth>(url, { headers })
  }

  getDataActivityMonth(name:string) {
    const url = `${this._baseURL}/survey/data-activity-month`;
    const headers = new HttpHeaders()
      .append('x-token', localStorage.getItem('token') || '')
      .append('nombreCientifico',name)
    return this.http.get<ResponseDataActivityMonth>(url, { headers })
  }

  //Disparar multiples observables combineLatest (observables[])

  getAllDataActivityMonth(commonScientificName:FishName[]){
    const url = `${this._baseURL}/survey/data-activity-month`;
    const token = localStorage.getItem('token') || '';
    const peticiones:Observable<ResponseDataActivityMonth>[] = [];

    commonScientificName.forEach(data=>{
      const headers = new HttpHeaders()
        .append('x-token', token)
        .append('nombreCientifico',data.scientificName)
      const peticion = this.getDataActivityMonth(data.scientificName)  
      peticiones.push(peticion)
    })
    
    return combineLatest(peticiones);
  }
}
