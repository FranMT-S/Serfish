import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario,refImage } from '../interfaces/interfaces';
import { UserService } from '../services/user.service';
import { FileUploadService } from '../services/file-upload.service';

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
  imageUrl!:refImage; 

  constructor( private authService:AuthService,
               private userService: UserService,
               private router:Router, 
               private fileUploadService:FileUploadService)
                { }

  ngOnInit(): void {
    this.usuario = this.authService.user;
    this.imageUrl = { "url": this.authService.getImageUrl()}
    this.fileUploadService.addRefImageProfile(this.imageUrl);
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

  action(elementUrl: string) {
    if (elementUrl === this.optionSetting[0].url){
      this.router.navigateByUrl(`/home-page/edit-profile/${this.usuario.uid}`)
    } else if(elementUrl === this.optionSetting[1].url){
      this.navagate("setting");
    }
  }
}
