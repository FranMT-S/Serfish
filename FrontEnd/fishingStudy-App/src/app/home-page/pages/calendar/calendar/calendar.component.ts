import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../services/calendar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {


  constructor( private fb : FormBuilder,
               private activatedRoute: ActivatedRoute,
               private router:Router) { }

  ngOnInit(): void {
  }

  mostrar(value:string){
    if(value==="C"){
      this.router.navigateByUrl(`home-page/calendar/view-calendar`)
    }else if(value === "E"){
      this.router.navigateByUrl(`home-page/calendar/event-setting`)
    }
  }

}
