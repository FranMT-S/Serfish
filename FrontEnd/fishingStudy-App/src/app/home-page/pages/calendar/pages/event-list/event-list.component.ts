import { Component, OnInit } from '@angular/core';
import { Evento } from '../../interfaces/event';
import { CalendarService } from '../../services/calendar.service';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {


  events:Evento[] = [];
  displayBasic: boolean = false;

  editEventForm: FormGroup = this.fb.group({
    name: ["", [Validators.required], []],
    description: ["", [Validators.required], []],
    location: ["", [Validators.required], []],
    startDate: ["", [Validators.required], []],
    endDate: ["", [Validators.required], []]
  });



  constructor( private calendarService:CalendarService,
               private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(){
    this.calendarService.getEvents().subscribe( res =>{
      this.events = res.events;
    })
  }

  deleteEvent(event:Evento){
    Swal.fire({
      title: 'Borrar evento',
      text: "¿Esta seguro que desea eliminar este evento?",
      icon: 'question',
      iconColor:'#3085d6',
      showCancelButton: true,
      confirmButtonColor: '#2F6FC6',
      cancelButtonColor: '#2F6FC6',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.calendarService.deleteEvent(event).subscribe( res => {
          Swal.fire({
            title:'Eliminado!',
            text:'Evento eliminado correctamente',
            icon:'success',
            showConfirmButton: false,
            timer: 1500
          })
        })
      }
    })
   
  }

  editEvent(event:Evento){
    this.displayBasic = true;
    console.log(event);
  }

  
}
