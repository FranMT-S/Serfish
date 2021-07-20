import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from '../interfaces/interfaces';

export interface OptionSetting{
  name:string,
  url :string,
  role?: string[]
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('snav') snav!: MatSidenav;
  panelOpenState = false;
  optionSetting:OptionSetting[] = [
    {name: "Editar Cuenta", url:"edit-profile"},
    { name: "Gestión de usuarios", url: "setting", role: ["admin"]},
    {name: "Cerrar sesión", url:"/auth/login"},
  ];
  
  usuario!:Usuario;

  constructor( private authService:AuthService,
               private router:Router ) { }

  ngOnInit(): void {
    this.usuario = this.authService.user;
  }

  navagate(url:string){
    this.router.navigateByUrl(`home-page/${url}`)
  }

  isAllowed(componentName:string){
    // Obtenemos los roles que tienen permitido entrar al componente
    let roles = this.optionSetting.find( e => e.name === componentName)?.role
              
    // Retorna true si es undifined (todos tienen permisos)
    // si no es undefined comprueba que exista el rol en el arreglo de optionSettings
    
    return !roles || roles.includes(this.usuario.role);  
  }

  logout(){
    this.authService.logOut();
  }

}
