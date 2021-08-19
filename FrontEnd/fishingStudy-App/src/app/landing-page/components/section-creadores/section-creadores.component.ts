import { Component, OnInit } from '@angular/core';
import { creator } from '../../../interfaces/creator.model';
@Component({
  selector: 'app-section-creadores',
  templateUrl: './section-creadores.component.html',
  styleUrls: ['./section-creadores.component.css']
})
export class SectionCreadoresComponent implements OnInit {



  creators : creator[] = [
    {
    img:'https://material.angular.io/assets/img/examples/shiba1.jpg', 
    Name : 'Ana Sofia Luna',
    role : 'admin',
    Info : 'buenas'
   
    },
    {
      Name : 'Cristian Jeanluc Boquin',
    role : 'admin',
    Info : 'buenas'
    },
    {
      Name : 'Francisco Antonio Madrid ',
    role : 'admin',
    Info : 'buenas'
    },
    {
      Name : 'Hector Jose Vasquez',
    role : 'admin',
    Info : 'buenas'
    },
    {
      Name : 'Josseth Esmeralda Urbina',
    role : 'admin',
    Info : 'buenas'
    },{
      Name : 'Renata Mavelyn Dubon',
    role : 'admin',
    Info : 'buenas'
    }
  ]
  constructor() { 
  }

  ngOnInit(): void {
  }
 
}





