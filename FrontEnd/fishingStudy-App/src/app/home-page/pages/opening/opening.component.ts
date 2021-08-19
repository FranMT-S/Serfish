import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { AuthService  } from '../../../auth/services/auth.service';
import { ClimateService } from '../climate/services/climate.service';
import { CurrentWeather, Current } from '../climate/interfaces/climate';

interface weatherData {
  icon: string;
  nameData: string;
  data: string;
}

@Component({
  selector: 'app-opening',
  templateUrl: './opening.component.html',
  styleUrls: ['./opening.component.css']
})
export class OpeningComponent implements OnInit {
  usuario!:Usuario;
  imageUrl = '';
  currentWeather!:CurrentWeather ;
  constructor( private authService:AuthService ,private ClimateService:ClimateService ) { }
   
 
  ngOnInit(): void {
    this.usuario = this.authService.user;
    this.imageUrl = this.authService.getImageUrl();

    this.ClimateService.getWeatherCurrent().subscribe(res=>{
      this.currentWeather = res
    })
  }


  
  
  


}
