import { Injectable, Input } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from "rxjs/operators";
import { UpdatePassword, UpdatePasswordResponse, Usuario } from '../interfaces/interfaces';

interface UsersResponse {
  ok:       boolean;
  oneUser:  boolean;
  usuarios: Usuario[];
  usuario:  Usuario;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  idModUser: string = '';
  private count:number=1;
  private _baseUrl:string = environment.baseUrl;
  private users:Usuario[]=[];

  get getEnableUsers(){
    this.count=1
    return this.users.filter(data=>{
      if(data.state){
        data.index=this.count;
        this.count++;
        return data
      }
      return 
    });
  }

  get getDisableUsers(){
    this.count=1
    return this.users.filter(data=>{
      if(!data.state){
        data.index=this.count;
        this.count++;
        return data
      }
      return 
    });
  }

  @Input()
  set updateArrayUsers(user:Usuario){
    const index = this.users.findIndex(data=>data.uid===user.uid);
    this.users[index].state=user.state;
  }

  constructor(private http:HttpClient) {}
  
  // En caso de recibir un uid retornara nada mas ese usuario, de lo contrario retornara a todos los usuario
  getUsers(uid?:string):Observable<UsersResponse>{
    const url = `${this._baseUrl}/usuarios`;
    const headers = new HttpHeaders()
      .append('x-token', localStorage.getItem('token') || '')
      .append('oneUser', uid ||'');
    this.users = [];
    return  this.http.get<UsersResponse>(url,{headers})
              .pipe(
                tap(res=>{
                  if(res.ok===true){
                    this.users=res.usuarios
                  }
                })
              )
  }

  updateUser(body: Usuario): Observable<boolean | string> {
    const url = `${this._baseUrl}/usuarios/updateUser`;
    const headers = new HttpHeaders()
      .append('x-token', localStorage.getItem('token') || '')
    return this.http.put<Usuario>(url, body, {headers})
      .pipe(
        map(resp => {
          return resp.ok
        }),
        catchError((err) => {
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













//################### Se Optimizo este codigo

// interface UserResponse {
//   ok: boolean;
//   saltos: null;
//   usuario: Usuario;
// }

// interface UserUpdate {
//   ok:  string;
//   userUpdate:Usuario;
// }



  // // En caso de recibir un uid retornara nada mas ese usuario, de lo contrario retornara a todos los usuario
  // getUsers(uid?:string):Observable<UsersResponse>{
  //   const url = `${this._baseUrl}/usuarios`;
  //   const headers = new HttpHeaders()
  //     .append('x-token', localStorage.getItem('token') || '')
  //     .append('oneUser', uid ||'');
  //   this.users = [];
  //   return  this.http.get<UsersResponse>(url,{headers})
  //             .pipe(
  //               tap(res=>{
  //                 if(res.ok===true){
  //                   this.users=res.usuarios
  //                 }
  //               })
  //               // map( res => {
  //               //   if(res.ok === true && res.oneUser==false){
  //               //     res.usuarios.forEach( (value,index) =>{
  //               //       index++;
  //               //       this.users.push({index,...value});
  //               //     });
  //               //   }
  //               //   return res
  //               // })
  //             )
  // }



   // getUser( userId?:string ): Observable<Usuario> {
  //   const url = `${this._baseUrl}/usuarios/getUser`;
  //   const headers = new HttpHeaders()
  //     .append('x-token', localStorage.getItem('token') || '')
  //   const params = new HttpParams()
  //     .append("uQuery",userId || '');

  //   return this.http.get<UserResponse>(url, {headers, params})
  //     .pipe(
  //       map(res => {
  //         return res.usuario;
  //       }),
  //       catchError((err) => {
  //         // console.log("CATCH",err.error)
  //         return of(err.error?.msg || "Error en la petición")
  //       })
  //     )payload
  // }



  // updateUser(body: Usuario): Observable<boolean | string> {
  //   const url = `${this._baseUrl}/usuarios/updateUser`;
  //   const headers = new HttpHeaders()
  //     .append('x-token', localStorage.getItem('token') || '')
  //   //   .append('uid', payload.uid || '')
  //   // const body = { 
  //   //   "name": payload.name,
  //   //   "email": payload.email,
  //   //   "role": payload.role,
  //   //   "state": payload.state
  //   // };

  //   return this.http.put<Usuario>(url, body, {headers})
  //     .pipe(
  //       map(resp => {
  //         return resp.ok
  //       }),
  //       catchError((err) => {
  //         return of(err.error?.msg || "Error en la petición")
  //       })
  //     );
  // }



    // changeState(uid:string,state:boolean):Observable<Usuario>{
  //   const url = `${this._baseUrl}/usuarios/changeState`;
  //   const body = {uid , state};

  //   return  this.http.post<UserUpdate>(url,body)
  //             .pipe(
  //               map( res => {
  //                    return res.userUpdate                  
  //                 }                
  //               )
  //             )
            
  //  }