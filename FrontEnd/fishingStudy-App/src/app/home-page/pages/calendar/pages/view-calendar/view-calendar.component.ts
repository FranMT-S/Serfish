import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

import { CalendarService } from '../../services/calendar.service';
import { Evento } from '../../interfaces/event';

@Component({
  selector: 'app-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrls: ['./view-calendar.component.css']
})
export class ViewCalendarComponent implements OnInit {

  data:Evento[] = []

  
  constructor( private calendarService:CalendarService) { }
  
  calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        headerToolbar:{
          left:'prev,next,today',
          center:'title',
          right:'dayGridMonth,timeGridWeek,timeGridDay'
        },
        locale:'es',
        events : this.data
        
  }
  
  ngOnInit()	:void{
    this.getEvents();

  }  

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }

  getEvents(){
    
    ///this.calendarService.getEventPlan().subscribe( res => {
    ///  console.log( 'res',res);
    ///  this.event.title = res.
    ///  this.event.start = res.startDate
    ///  this.event.end = res.endDate
    /// console.log( this.event.title);
    ///});
    
   
  } 
 
  
}