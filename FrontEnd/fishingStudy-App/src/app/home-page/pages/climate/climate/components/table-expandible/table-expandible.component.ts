import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Current, Daily } from '../../../interfaces/climate';
import { Input } from '@angular/core';
import { KelvilCelsiusPipe } from '../../../pipes/kelvil-celsius.pipe';
import { MsKmhPipe } from '../../../pipes/ms-kmh.pipe';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}


@Component({
  selector: 'app-table-expandible',
  templateUrl: './table-expandible.component.html',
  styleUrls: ['./table-expandible.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableExpandibleComponent implements OnInit {
  // Pipes
  kelvilCelsiu = new KelvilCelsiusPipe();
  msKmhPipe = new MsKmhPipe();

  dataDays:Daily[]  = []
  @Input()DaysOrHours:String = "Days"
  @Input() dataDay!:Daily[]; 
  columnsToDisplayDay = ['dt', 'temp', 'humidity','weather'];

  expandedElement:boolean = true;

  constructor() { }

  ngOnInit(): void {
    console.log(this.DaysOrHours)
    this.dataDays=this.dataDay;
    
   
  }


  
}
