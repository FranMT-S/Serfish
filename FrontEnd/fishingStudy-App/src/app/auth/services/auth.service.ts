import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from "rxjs/operators";
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Usuario, LoginResponse } from '../../home-page/interfaces/interfaces';
import { FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { AuthResponse, ResetPasswordRequest, ResetPasswordResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl:string = environment.baseUrl;
  private _user!:Usuario;

  /* Mínimo ocho caracteres, al menos una letra mayúscula, una minúscula y un número. */
  public passwordRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  get user(){
    return {...this._user}
  }

  constructor(private http: HttpClient,
    private router: Router ) { }

  login( email:string, password:string ):Observable<boolean | string>{
    const url  = `${this._baseUrl}/login`
    const body = {email,password}
    return this.http.post<LoginResponse>( url, body)
      .pipe(
        tap(resp => {
          if(resp.ok === true){
            localStorage.setItem("token",resp.token!)
            console.log(resp.data?.uid!)
            this._user = {
              uid   :resp.data?.uid!,
              name  :resp.data?.name!,
              email :resp.data?.email!,
              role  :resp.data?.role!
            }
          }
        }),
        map( resp => {
          return resp.ok
        }),
        catchError( (err) =>{
          // console.log("CATCH",err.error)
          return of(err.error?.msg||"Error en la peticion")
        })
      )
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl("/auth/login")
  }

  register( form:FormGroup ){
    const url = `${this._baseUrl}/usuarios`
    return this.http.post<AuthResponse>(url, form.value)
      .pipe(
        map(resp => resp.ok),
        catchError( err => of(err.error.msg))
      ); 
  }

  validarToken():Observable<boolean> {

    const url = `${ this._baseUrl }/login/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>( url, { headers } )
      .pipe(
        map( resp => {
          if (localStorage.getItem('token') === null) {
            return false;
          }
          localStorage.setItem("token", resp.token!)
          this._user = {
            uid: resp.uid!,
            name: resp.name!,
            email: resp.email!,
            role: resp.role!
          }
          return resp.ok;
        }),
        catchError (err => of(false))
      );

  }
  /* Verifica si las contraseñas de auth/reset son iguales */
  samePassword(AC: FormControl):ValidationErrors | null{
    return new Promise (resolve=>{
      const newPassword: string = AC.parent?.get('newPassword')?.value;
      const confirmPassword: string = AC.parent?.get('confirmPassword')?.value;
      if (newPassword === confirmPassword) {
        return resolve(null);
      } else {
        return resolve({ samePassword: true });
      }
    })
  }

  /* Realiza la petición de cambio de contraseña al backend */
  resetPassword(payload: ResetPasswordRequest): Observable<boolean | string>{
    
    const url = `${this._baseUrl }/login/new-password/${ payload.token }`;
    const body = { "newPassword":payload.newPassword } ;

    return this.http.put<ResetPasswordResponse>(url, body)
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
  
  forgotPassword(email:string):Observable<boolean> {
    const url = `${ this._baseUrl }/login/forgot-password`;
    const headers = new HttpHeaders()
      .append('email',email)

    return this.http.get<AuthResponse>( url, { headers } )
      .pipe(
        map( resp => {
          return resp.ok;
        }),
        catchError (err => of(false))
      );

  }
  

}
