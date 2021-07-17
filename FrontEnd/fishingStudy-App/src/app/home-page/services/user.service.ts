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

  getUsers():Observable<Usuario[]>{
    const url = `${this._baseUrl}/usuarios`;
    this.users = [];
    return  this.http.get<UserResponse>(url)
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

}
