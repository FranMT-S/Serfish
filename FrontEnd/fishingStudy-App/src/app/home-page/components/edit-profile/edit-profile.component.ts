import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{

  editForm: FormGroup = this.fb.group({
    name    :["", [Validators.required], []],
    email   :["", [Validators.required], []],
    role    :["",[Validators.required],[]],
    img :["", [Validators.required], []],
  });

  constructor(private fb : FormBuilder,
              private userService : UserService          
    ) {}

    ngOnInit(){
    }



}
