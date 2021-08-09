import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CalendarService } from '../../services/calendar.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  
  editForm: FormGroup = this.fb.group({
    name: ["", [Validators.required], []],
    description: ["", [Validators.required], []],
    location: ["", [Validators.required], []],
    startDate: ["", [Validators.required], []],
    endDate: ["", [Validators.required], []]
  });

  constructor(private fb: FormBuilder,
              private calendarService:CalendarService,
              private activatedRoute: ActivatedRoute
   ) { }

  
  ngOnInit(): void {

  }

  updateEvent(){

  }

}
