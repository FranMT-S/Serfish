import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';
import { Usuario } from '../../interfaces/interfaces';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{

  formSubmitted:boolean = false;
  name:any;
  editForm!: FormGroup;
  
   
 

  editPassword: FormGroup = this.fb.group({
    oldPassword     :["", [Validators.required], []],
    newPassword     :["", [Validators.required, Validators.pattern(this.authService.passwordRegex)], []],
    confirmPassword :["", [Validators.required], [this.authService.samePassword]]
  });

 

  constructor(private fb : FormBuilder,
              private userService : UserService,
              private authService : AuthService          
    ) {
     this.name = this.userService.getUser().subscribe(res => {res.name});
    }

  ngOnInit(){

    this.editForm = this.fb.group({
      name    :[this.name,[Validators.required], []],
      email   :[, [Validators.required,Validators.email], []],
      role    :[, [Validators.required], []],
      status  :[, [Validators.required], []],
    });

  }

  updateUser(){

    this.formSubmitted = true;
    this.userService.updateUser(this.editForm.value).
    subscribe( res => {
      if(res === true){
        Swal.fire({
          icon: 'success',
          title: 'La informacion se actualizo de forma exitosa',
          showConfirmButton: false,
          timer: 1500
        });
      }else{
        Swal.fire("Se detecto un error al actualizar");
      }
    })
  }

  updatePassword(){
    this.formSubmitted = true;
  }

  clean(){
    this.editForm.reset();
    this.editForm.markAsPristine;
    this.editForm.markAsTouched
  }

}

