import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

export interface OptionSetting{
  name:string,
  url :string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('snav') snav!: MatSidenav;
  panelOpenState = false;
  typesOfShoes: string[] = ['Perfil y cuenta', 'Gestión de usuarios', 'Loafers', 'Moccasins', 'Cerrar sesión'];
  optionSetting:OptionSetting[] = [
    {name: "Editar Cuenta", url:"edit-profile"},
    {name: "Gestión de usuarios", url:"setting"},
    {name: "Cerrar sesión", url:"/auth/login"},
  ];
  constructor( private router:Router,
    private  authService: AuthService) { }

  ngOnInit(): void {
  }

  navagate(url:string){
    this.router.navigateByUrl(`home-page/${url}`)
  }

  action(elementUrl: string){
    if( elementUrl === this.optionSetting[2].url){
      this.authService.logOut();
    }else{
      this.snav.close()
    }
  }
}
