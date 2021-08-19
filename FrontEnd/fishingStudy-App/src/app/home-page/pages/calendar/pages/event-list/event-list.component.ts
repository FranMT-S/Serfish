import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Evento } from '../../interfaces/event';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {


  nextEvents:Evento[] = [];
  pastEvents:Evento[] = [];
  btnEdit: boolean = false;
 

  editEventForm: FormGroup = this.fb.group({
    title: ["", [Validators.required], []],
    description: ["", [Validators.required], []],
    location: ["", [Validators.required], []],
    start: ["", [Validators.required], []],
    end: ["", [Validators.required], []]
  });



  constructor( private calendarService:CalendarService,
               private fb: FormBuilder,
               private router: Router
    ) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(){
    this.calendarService.getEvents().subscribe( res =>{
      if(res.ok){
        res.events.map( data =>{
          if (new Date(data.end) > new Date() && !this.nextEvents.includes(data) ){           
            this.nextEvents.push(data);
          }else{
            if (!this.nextEvents.includes(data) ){         
              this.pastEvents.push(data);
            }
           
          }
        });
      }
    })
  }

  updateEvent(event:Evento){
    this.router.navigateByUrl(`home-page/calendar/event-edit/${event._id}`)
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
          this.pastEvents = [];
          this.nextEvents = [];
          this.getEvents();
         
        })
      }
    })
    

  }

  
}
