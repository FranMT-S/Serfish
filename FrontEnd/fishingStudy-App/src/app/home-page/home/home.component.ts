import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from '../interfaces/interfaces';
import { UserService } from '../services/user.service';

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
    {name: "Gestión de usuarios", url: "setting", role: ["admin"]},
  ];
  
  usuario!:Usuario;
  imageUrl = '';
  avatartStyle = ""

  constructor( private authService:AuthService,
               private userService: UserService,
               private router:Router ) { }

  ngOnInit(): void {
    this.usuario = this.authService.user;
    this.imageUrl = this.authService.getImageUrl();
    this.avatartStyle = `background:url(${this.imageUrl}); background-size:cover;`;
      
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
  editarCuenta(){
    this.snav.close()
    this.userService.idModUser = '';
    this.navagate("edit-profile");
  }
  gestionarUsuarios(){
    this.snav.close()
    this.navagate("setting");
  }

  action(elementUrl: string) {
    if (elementUrl === this.optionSetting[0].url){
      this.editarCuenta();
    } else {
      this.snav.close()
    }
  }

}
