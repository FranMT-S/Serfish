import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  panelOpenState = false;
  typesOfShoes: string[] = ['Perfil y cuenta', 'Gestion de usuarios', 'Loafers', 'Moccasins', 'Cerrar sesion'];
  optionSetting:OptionSetting[] = [
    {name: "Editar Cuenta", url:"edit-profile"},
    {name: "Gestion de usuarios", url:"setting"},
    {name: "Cerrar sesion", url:"/auth/login"},
  ];
  constructor( private router:Router) { }

  ngOnInit(): void {
  }

  navagate(url:string){
    this.router.navigateByUrl(`home-page/${url}`)
  }
}
