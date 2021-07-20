import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';
import { Usuario } from '../../interfaces/interfaces';
import { FileUploadService } from '../../services/file-upload.service';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{
  
  // es el id del usuario que se va a mostrar y/o actualizar
  //@Input() idModUser: string = '';

  usuarioActual: Usuario = this.authService.user;

  user: Usuario = {
    'uid':'',
    'name':'',
    'email':'',
    'role':'',
    'state': true,
    'img': ''
  };
  public changeImage!: File;
  private _baseUrl:string = environment.baseUrl;
  imageUrl = '';

  
  
  editForm: FormGroup = this.fb.group({
    name    :["",[Validators.required], []],
    email   :["", [Validators.required,Validators.email], []],
    role    :["", [Validators.required], []],
    state  :["", [Validators.required], []],
  });
  editPassword: FormGroup = this.fb.group({
    oldPassword     :["", [Validators.required], []],
    newPassword     :["", [Validators.required, Validators.pattern(this.authService.passwordRegex)], []],
    confirmPassword :["", [Validators.required], [this.authService.samePassword]]
  });


  constructor(private fb : FormBuilder,
              private userService : UserService,
              private authService : AuthService,
              private fileUploadService: FileUploadService
    ) {
    
    }
  
  checked: any = false;

  ngOnInit(){
    this.userService.getUser(this.userService.idModUser).subscribe(res => {
      this.user = res;
      this.editForm.patchValue({ 'name': res.name, 'email': res.email})
      this.editForm.get('role')?.patchValue(res.role)
      this.editForm.get('state')?.patchValue(res.state)
      this.imageUrl = this.getImageUrl(this.user);
      console.log(this.imageUrl);
      console.log(this.user);
    });
    // console.log("desde oninit",this.user);
    this.checked = this.editForm.get('state') || false;
    //console.log(this.userService.idModUser)
  }
  
  
  updateUser(){
    this.userService.updateUser({ uid: this.userService.idModUser, ...this.editForm.value}).
    subscribe( res => {
      // console.log(res)
      if(res === true){
        Swal.fire({
          icon: 'success',
          title: 'La información se actualizo de forma exitosa',
          showConfirmButton: false,
          timer: 1500
        });
      }else{
        Swal.fire("Se detecto un error al actualizar");
      }
    })
  }

  updatePassword(formDirective: FormGroupDirective){
    this.userService.updatePassword({ uid: this.userService.idModUser, ...this.editForm.value }).
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
          text:'Verifique su antigua contraseña y confirme la recién ingresada'
        }
          );
      }
    })
    formDirective.resetForm();
    this.editPassword.reset();
  }

  getImageUrl(user:Usuario){
    if(user.img){
      return `${this._baseUrl}/upload/usuarios/${user.img}`;
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

