import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../../auth/services/auth.service';
import { UserService } from '../../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  @Input() uid!:string;
  hide: boolean = true;
  hide2: boolean = true;
  hide3: boolean = true;
  editPassword: FormGroup = this.fb.group({
    oldPassword     :["", [Validators.required], []],
    newPassword     :["", [Validators.required, Validators.pattern(this.authService.passwordRegex)], []],
    confirmPassword :["", [Validators.required], [this.authService.samePassword]]
  });

  constructor(private fb : FormBuilder,
              private userService : UserService,
              private authService : AuthService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(params => {
        this.uid=params.uid
      })
  }
  updatePassword(){
    this.userService.updatePassword({ uid: this.uid, ...this.editPassword.value }).
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
    this.editPassword.reset();
  }
}
