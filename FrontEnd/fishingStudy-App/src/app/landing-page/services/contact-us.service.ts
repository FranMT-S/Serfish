import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from "rxjs/operators";
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface Response {
  ok: boolean;
  msg: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  private _baseUrl: string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  sendContactInfo(nombre: string, email: string, organizacion: string, mensaje: string){
    const url = `${this._baseUrl}/contact/`;
    const body = { nombre, email, organizacion, mensaje };
    //console.log(body);
    return this.http.post<Response>(url, body)
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }
}
