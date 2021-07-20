import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import { Usuario } from '../home-page/interfaces/interfaces';




@Injectable({
  providedIn: 'root'
})
export class SettingGuard  implements CanActivate,CanLoad{
  private usuario!:Usuario;
  private roles = ["admin"]

  constructor( private authService: AuthService,
                 private router: Router ){
                this.usuario = this.authService.user;
    };
  
  canActivate(): boolean{
   
    if(!(this.roles.includes(this.usuario.role)))
        this.router.navigateByUrl('/home-page/opening');
      
    return true
  }

  canLoad(): boolean{

    if(!(this.roles.includes(this.usuario.role)))
        this.router.navigateByUrl('/home-page/opening');
      
    return true
  }

}