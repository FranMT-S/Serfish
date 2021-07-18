import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent{

  formSubmitted:boolean = false;

  editForm: FormGroup = this.fb.group({
    name    :["", [Validators.required], []],
    email   :["", [Validators.required,Validators.email], []],
    role    :["", [Validators.required], []],
    status  :["", [Validators.required], []],
  });

  editPassword: FormGroup = this.fb.group({
    oldPassword     :["", [Validators.required], []],
    newPassword     :["", [Validators.required, Validators.pattern(this.authService.passwordRegex)], []],
    confirmPassword :["", [Validators.required], [this.authService.samePassword]]
  });

  constructor(private fb : FormBuilder,
              private userService : UserService,
              private authService : AuthService          
    ) {}

    updateUser(){
      this.formSubmitted = true;
    }

    updatePassword(){
      this.formSubmitted = true;
    }

}

