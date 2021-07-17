import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";
import { ThisReceiver } from '@angular/compiler';

interface UserResponse {
  ok:       boolean;
  saltos:   null;
  usuarios: Usuario[];
}

interface Usuario {
  role:  string;
  name:  string;
  email: string;
  uid:   string;
  index?:number;
  state:Boolean;
}

interface UserUpdate {
  ok:  string;
  userUpdate:Usuario;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _baseUrl:string = environment.baseUrl;
  private user:Usuario[]=[];

  constructor(private http:HttpClient) { }

  getUsers():Observable<Usuario[]>{
    const url = `${this._baseUrl}/usuarios`;
    this.user = [];
    return  this.http.get<UserResponse>(url)
              .pipe(
                map( res => {
                  if(res.ok === true){
                    res.usuarios.forEach( (value,index) =>{
                      index++;
                      this.user.push({index,...value});
                    });
                    
                  }
                  return this.user
                })
              )
  }

  changeState(uid:string,state:boolean):Observable<Usuario>{
    const url = `${this._baseUrl}/usuarios/changeState`;
    const body = {uid , state};

    return  this.http.post<UserUpdate>(url,body)
              .pipe(
                map( res => {
                     return res.userUpdate                  
                  }                
                )
              )
            
  }

}
