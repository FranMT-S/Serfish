import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../../auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Usuario } from 'src/app/home-page/interfaces/interfaces';
import { environment } from '../../../../../environments/environment';

interface UsersResponse {
  ok:       boolean;
  oneUser:  boolean;
  usuarios: Usuario[];
  usuario:  Usuario;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  usuarioActual: Usuario = this.authService.user;
  user: Usuario = {
    uid   :'',
    name  :'',
    email :'',
    role  :'',
    state : true,
    img   : ''
  };

  public  uploadImage!: File;
  public imgTemp:any;
  private _baseUrl:string = environment.baseUrl;
  imageUrl = '';

  //JEAN Pruebas
  prueba!:UsersResponse;
  uid!:string;

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

  cargando:boolean=true;
  constructor(private fb : FormBuilder,
              private userService : UserService,
              private authService : AuthService,
              private activatedRoute: ActivatedRoute,
              private router:Router
    ) {
    
    }

  ngOnInit(){
    this.activatedRoute.params
    .pipe(
      tap(()=>this.cargando=true),
      switchMap( params => {
        this.uid = params.uid;
        return  this.userService.getUsers(params.uid);
      }) 
    )
    .subscribe(
      res => {
      this.prueba = res;
      this.user = this.prueba.usuario;
      this.editForm.patchValue({ 'name': this.prueba.usuario.name, 'email': this.prueba.usuario.email})
      this.editForm.get('role')?.patchValue(this.prueba.usuario.role)
      this.editForm.get('state')?.patchValue(this.prueba.usuario.state)
      this.imageUrl = this.getImageUrl(this.user);
      this.cargando=false
    }
    );
  }
  
  getImageUrl(user:Usuario){
    if(user.img){
      return `${this._baseUrl}/upload/usuarios/${user.img}`;
    }else{
      return `${this._baseUrl}/upload/usuarios/no-image`;
    }
  }

  mostrar(value:string){
    if(value==="G"){
      this.router.navigateByUrl(`home-page/edit-profile/${this.uid}/edit-profile/${this.uid}`)
    }else if(value === "P"){
      this.router.navigateByUrl(`home-page/edit-profile/${this.uid}/update-password/${this.uid}`)
    }
  }

}
