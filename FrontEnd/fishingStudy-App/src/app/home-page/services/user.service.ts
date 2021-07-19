import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { UpdateData, UpdateDataResponse, UpdatePassword, UpdatePasswordResponse } from '../interfaces/interfaces';

interface UsersResponse {
  ok:       boolean;
  saltos:   null;
  usuarios: Usuario[];
}
interface UserResponse {
  ok: boolean;
  saltos: null;
  usuario: Usuario;
}

interface Usuario {
  role:  string;
  name:  string;
  email: string;
  uid:   string;
  index?:number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _baseUrl:string = environment.baseUrl;
  private users:Usuario[]=[];

  get getUsersArray(){
    return [...this.users];
  }
  constructor(private http:HttpClient) { }

  getUsers(last?:string):Observable<Usuario[]>{
    const url = `${this._baseUrl}/usuarios`;
    const headers = new HttpHeaders()
      .append('x-token', localStorage.getItem('token') || '');
    const params = new HttpParams()
      .append("last", last || 'false');
    this.users = [];
    return  this.http.get<UsersResponse>(url, { headers, params })
              .pipe(
                map( res => {
                  if(res.ok === true){
                    res.usuarios.forEach( (value,index) =>{
                      index++;
                      this.users.push({index,...value});
                    });
                  }
                  return this.users
                })
              )
  }

  getUser( userId?:string ): Observable<Usuario> {
    const url = `${this._baseUrl}/usuarios/getUser`;
    const headers = new HttpHeaders()
      .append('x-token', localStorage.getItem('token') || '')
    const params = new HttpParams()
      .append("uQuery",userId || '');

    return this.http.get<UserResponse>(url, {headers, params})
      .pipe(
        map(res => {
          return res.usuario;
        }),
        catchError((err) => {
          // console.log("CATCH",err.error)
          return of(err.error?.msg || "Error en la petición")
        })
      )
  }

  updateUsuario(payload: UpdateData): Observable<boolean | string> {
    const url = `${this._baseUrl}/usuarios/updateUser`;
    const headers = new HttpHeaders()
      .append('x-token', localStorage.getItem('token') || '')
      .append('uid', payload.uid || '')
    const body = { 
      "name": payload.name,
      "email": payload.email,
      "role": payload.role
    };

    return this.http.put<UpdateDataResponse>(url, body, {headers})
      .pipe(
        map(resp => {
          return resp.ok
        }),
        catchError((err) => {
          // console.log("CATCH",err.error)
          return of(err.error?.msg || "Error en la petición")
        })
      );
  }
  
  updatePassword(payload: UpdatePassword): Observable<boolean | string>{

    const url = `${this._baseUrl}/usuarios/updatePassword`;
    const headers = new HttpHeaders()
      .append('x-token', localStorage.getItem('token') || '')
      .append('uid', payload.uid || '')
    const body = { 
      "oldPassword": payload.oldPassword, 
      "newPassword": payload.newPassword 
    };

    return this.http.put<UpdatePasswordResponse>(url, body, { headers })
      .pipe(
        map(res => {
          return res.ok
        }),
        catchError((err) => {
          return of(err.error.msg || "Error en la petición")
        })
      );
  }

}
