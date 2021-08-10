import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CalendarService } from '../../services/calendar.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';



import Swal from 'sweetalert2';

@Component({
  selector: 'app-events-setting',
  templateUrl: './events-setting.component.html',
  styleUrls: ['./events-setting.component.css']
})
export class EventsSettingComponent implements OnInit {

  @Input() id!: string;

  eventForm: FormGroup = this.fb.group({
    title: ["", [Validators.required], []],
    description: ["", [Validators.required], []],
    location: ["", [Validators.required], []],
    start: ["", [Validators.required], []],
    end: ["", [Validators.required], []]
  });

  constructor(private fb: FormBuilder,
              private calendarService:CalendarService,
              private activatedRoute: ActivatedRoute
           ) { }

  ngOnInit(): void {
   
    this.activatedRoute.params
    .subscribe(params => {
      this.id = params.id
      if(this.id){
        this.calendarService.getEvents(this.id).subscribe(res => {
          if(res.ok){
            this.eventForm.get("title")?.patchValue(res.events[0].title);
            this.eventForm.get("description")?.patchValue(res.events[0].description);
            this.eventForm.get("location")?.patchValue(res.events[0].location);
            /* this.eventForm.get("start")?.patchValue(res.events[0].start);
            this.eventForm.get("end")?.patchValue(res.events[0].end); */
          }
        });
      }
      /* console.log(this.eventForm.value) */
    });

  }

  action(){
    
    if(typeof this.id === 'undefined'){
      this.createEvent();
    }else{
      this.updateEvent();
    }
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
        }).then(() => { this.eventForm.reset(); });
      }else{
        Swal.fire({
          icon: 'warning',
          title : 'Se detecto un error al crear el evento',
          text:'Verifique los datos ingresados'
        }
          );
      }
    })
  }

  updateEvent() {
    this.calendarService.updateEvent({ _id:this.id, ...this.eventForm.value}).
    subscribe( res => {
      if(res){
        Swal.fire({
          icon: 'success',
          title: 'Evento actualizado exitosamente',
          showConfirmButton: false,
          timer: 1500
        });
      }else{
        Swal.fire({
          icon: 'warning',
          title : 'Se detecto un error al actualizar el evento',
          text:'Verifique los datos ingresados'
        }
          );
      }
    });
  }

}
