import { Component, OnInit } from '@angular/core';
import { creator } from '../../../interfaces/creator.model';
@Component({
  selector: 'app-section-creadores',
  templateUrl: './section-creadores.component.html',
  styleUrls: ['./section-creadores.component.css']
})
export class SectionCreadoresComponent implements OnInit {




  creators : creator[][] = [
    [
      {
        img: "../../../../assets/landingPage/creators/sofia.jpeg", 
        Name : 'Ana Sofia Luna',
        role : 'Programadora, Analista',
        Info : 'Estudiante de IS',
        participation: [
                        {
                          labor:"Base de datos",
                          percent:"80" 
                        },
                        {
                          labor:"Programacion",
                          percent:"85" 
                        },
                        {
                          labor:"Diseño",
                          percent:"80" 
                        }
                       ]
      },
      {
        img: "../../../../assets/landingPage/creators/jean.png",
        Name : 'Cristian Jeanluc Boquin',
        role : 'Lider',
        Info : 'Estudiante de IS',
        participation: [
                        {
                          labor:"Base de datos",
                          percent:"80" 
                        },
                        {
                          labor:"Programacion",
                          percent:"85" 
                        },
                        {
                          labor:"Diseño",
                          percent:"90" 
                        }
                      ]
      },
      {
        img: "../../../../assets/landingPage/creators/hector.jpg",
        Name : 'Hector Jose Vasquez',
        role : 'Programador, Diseñador',
        Info : 'Estudiante de IS',
        participation: [
                        {
                          labor:"Base de datos",
                          percent:"80" 
                        },
                        {
                          labor:"Programacion",
                          percent:"85" 
                        },
                        {
                          labor:"Analisis",
                          percent:"80" 
                        }
                      ]
      },
    ],
    [
      {
        img: "../../../../assets/landingPage/creators/fran.png",
        Name : 'Francisco Antonio Madrid ',
        role : 'Programador',
        Info : 'Estudiante de IS',
        participation: [
                        {
                          labor:"Programacion",
                          percent:"80" 
                        },
                        {
                          labor:"Diseño",
                          percent:"75" 
                        }
                      ]        
      },
      {
        img: "../../../../assets/landingPage/creators/jeus.jpeg",
        Name : 'Josseth Esmeralda Urbina',
        role : 'Programadora',
        Info : 'Estudiante de IS',
        participation: [

                        {
                          labor:"Programacion",
                          percent:"75" 
                        },
                        {
                          labor:"Diseño",
                          percent:"75" 
                        }
                      ]
      },
      {
        img: "../../../../assets/landingPage/creators/ren.jpeg",
        Name : 'Renata Mavelyn Dubon',
        role : 'Programadora, Analista',
        Info : 'Estudiante de IS',
        participation: [
                        {
                          labor:"Base de datos",
                          percent:"80" 
                        },
                        {
                          labor:"Programacion",
                          percent:"85" 
                        },
                        {
                          labor:"Analisis",
                          percent:"80" 
                        }
                      ]
      }
    ]
  ]
  constructor() { 
  }

  ngOnInit(): void {
  }
 
}





