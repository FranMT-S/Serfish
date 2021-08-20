import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { datoBiologico, SurveyRequest, SurveyResponse } from '../pages/survey/interface/interface';

import { Observable, of } from 'rxjs';
import { map, catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient) { }

  private _baseUrl: string = environment.baseUrl;

  registrarEncuesta(payload: SurveyRequest){
    const url = `${this._baseUrl}/survey`
    const headers = new HttpHeaders()
      .append('x-token', localStorage.getItem('token') || '');
    return this.http.post<SurveyResponse>(url, payload, { headers })
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }

}
