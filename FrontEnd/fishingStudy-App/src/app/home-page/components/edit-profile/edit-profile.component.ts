import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';
import { Usuario } from '../../services/user.service';
import { FileUploadService } from '../../services/file-upload.service';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{

  user: Usuario = {
    'uid':'',
    'name':'',
    'email':'',
    'role':'',
    'status':'',
    'image':''
  };
  public changeImage!: File;
  private _baseUrl:string = environment.baseUrl;
  imageUrl = '';

  
  
  editForm: FormGroup = this.fb.group({
    name    :["",[Validators.required], []],
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
              private authService : AuthService,
              private fileUploadService:FileUploadService     
              
    ) {}

  ngOnInit(){
    this.userService.getUser().subscribe(res => {
     this.user = res;
      this.editForm.setValue({'name':res.name,'email':res.email,'role':res.role,'status':''}) 
    });
    this.imageUrl = this.getImageUrl(this.user);
  }
  
  updateUser(){
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

  updatePassword(formDirective: FormGroupDirective){
    this.userService.updatePassword(this.editPassword.value).
    subscribe( res => {
      if(res === true){
        Swal.fire({
          icon: 'success',
          title: 'La contraseña se actualizo de forma exitosa',
          showConfirmButton: false,
          timer: 1500
        });
      }else{
        Swal.fire({
          icon: 'warning',
          title : 'Se detecto un error al actualizar',
          text:'Verifique su antigua contraseña y confirme la recien ingresada'
        }
          );
      }
    })
    formDirective.resetForm();
    this.editPassword.reset();
  }

  getImageUrl(user:Usuario){
    if(this.user.image){
      return `${this._baseUrl}/upload/usuarios/${this.user.image}`;
    }else{
      return `${this._baseUrl}/upload/usuarios/no-image`;
    }
  }

  changeImg( file:File ){
    this.changeImage = file;

  }

  updateImg(){
    this.fileUploadService.updateImage(this.changeImage,'usuarios',this.user.uid);
  }
}

