import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Current, Daily } from '../../../interfaces/climate';
import { Input } from '@angular/core';
import { KelvilCelsiusPipe } from '../../../pipes/kelvil-celsius.pipe';
import { MsKmhPipe } from '../../../pipes/ms-kmh.pipe';
import { ClimateService } from '../../../services/climate.service';


@Component({
  selector: 'app-table-expandiblehours',
  templateUrl: './table-expandiblehours.component.html',
  styleUrls: ['./table-expandiblehours.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableExpandiblehoursComponent implements OnInit {
  // Pipes
  kelvilCelsiu = new KelvilCelsiusPipe();
  msKmhPipe = new MsKmhPipe();

  dataDays:Current[]  = []
  @Input()DaysOrHours:String = "Hours"
  @Input() dataDay!:Current[]; 
  columnsToDisplayDay = ['dt', 'temp', 'humidity','weather'];

  expandedElement:boolean = true;

  constructor(private ClimateService:ClimateService)  {



   }

   async ngOnInit() {
    await this.ClimateService.getWeatherCurrentHoursDays()
    this.dataDays=this.ClimateService.getWeatherHoursData.slice(1,48)
    
   
  }


  
}



  


