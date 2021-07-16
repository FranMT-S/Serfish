import { Component, OnInit } from '@angular/core';
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
  panelOpenState = false;
  typesOfShoes: string[] = ['Perfil y cuenta', 'Gestion de usuarios', 'Loafers', 'Moccasins', 'Cerrar sesion'];
  optionSetting:OptionSetting[] = [
    {name: "Editar Cuenta", url:"opening"},
    {name: "Gestion de usuarios", url:"setting", role : ["admin"]},
    {name: "Cerrar sesion", url:"/auth/login"},
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

}
