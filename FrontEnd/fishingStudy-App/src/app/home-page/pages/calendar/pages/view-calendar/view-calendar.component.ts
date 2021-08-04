import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { CalendarService } from '../../services/calendar.service';
import { Evento, ShowEvent } from '../../interfaces/event';

@Component({
  selector: 'app-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrls: ['./view-calendar.component.css']
})
export class ViewCalendarComponent implements OnInit {

  events:Evento[] = [];
  
  
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    //this.calendarEvents
    /**events: [
      { title: 'event 1', date: '2019-04-01' },
      { title: 'event 2', date: '2019-04-02' }
    ]
*/  
    //events : this.calendarEvents

  /*events : this.calendarEvents.forEach((element:ShowEvent) => {
  {element.name
    element.startDate}
  })*/

};

 
  constructor( private calendarService:CalendarService) { }

  ngOnInit(): void {
  
    
}  

  getEvents(){
    this.calendarService.getEvents().subscribe( ({events}) =>{
      this.events = events;
    
    })
  }
 
  

}
