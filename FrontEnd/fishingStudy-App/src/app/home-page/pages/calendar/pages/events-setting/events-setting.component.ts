import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CalendarService } from '../../services/calendar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-events-setting',
  templateUrl: './events-setting.component.html',
  styleUrls: ['./events-setting.component.css']
})
export class EventsSettingComponent implements OnInit {

  
  eventForm: FormGroup = this.fb.group({
    name: ["", [Validators.required], []],
    description: ["", [Validators.required, Validators.email], []],
    startDate: ["", [Validators.required], []],
    endDate: ["", [Validators.required], []],
  });

  constructor(private fb: FormBuilder,
              private calendarService:CalendarService
           ) { }

  ngOnInit(): void {
  }

  createEvent(){
    this.calendarService.registerEvent(this.eventForm).
    subscribe( res => {
      if(res){
        Swal.fire({
          icon: 'success',
          title: 'Evento creado exitosamente',
          showConfirmButton: false,
          timer: 1500
        });
      }else{
        Swal.fire({
          icon: 'warning',
          title : 'Se detecto un error al crear el evento',
          text:'Verifique los datos ingresados'
        }
          );
      }
    })
    this.eventForm.reset();
  }

}
