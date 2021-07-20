import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-opening',
  templateUrl: './opening.component.html',
  styleUrls: ['./opening.component.css']
})
export class OpeningComponent implements OnInit {
  usuario!:Usuario;
  imageUrl = '';
  constructor( private authService:AuthService) { }

  ngOnInit(): void {
    this.usuario = this.authService.user;
    this.imageUrl = this.authService.getImageUrl();
  }

  logout(){
    this.authService.logOut();
  }

}
