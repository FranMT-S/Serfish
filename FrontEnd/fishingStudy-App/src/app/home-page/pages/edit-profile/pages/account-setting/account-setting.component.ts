import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Usuario } from '../../../../interfaces/interfaces';
import { UserService } from '../../../../services/user.service';
import { AuthService } from '../../../../../auth/services/auth.service';
import { FileUploadService } from '../../../../services/file-upload.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators';

interface UsersResponse {
  ok: boolean;
  oneUser: boolean;
  usuarios: Usuario[];
  usuario: Usuario;
}
@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent implements OnInit {
  // @Input() uid!:string;
  private _baseUrl: string = environment.baseUrl;
  imageUrl = '';
  public uploadImage!: File;
  usuarioActual: Usuario = this.authService.user;
  public imgTemp: any;

  user: Usuario = {
    uid: '',
    name: '',
    email: '',
    role: '',
    state: true,
    img: ''
  };

  //JEAN Pruebas
  prueba!: UsersResponse;
  uid!: string;

  editForm: FormGroup = this.fb.group({
    name: ["", [Validators.required], []],
    email: ["", [Validators.required, Validators.email], []],
    role: ["", [Validators.required], []],
    state: ["", [Validators.required], []],
  });

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private fileUploadService: FileUploadService,
    private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(params => {
          this.uid = params.uid;
       
          return this.userService.getUsers(params.uid);
        })
      )
      .subscribe(
        res => {
          this.prueba = res;
          this.user = this.prueba.usuario;
          this.editForm.patchValue({ 'name': this.prueba.usuario.name, 'email': this.prueba.usuario.email })
          this.editForm.get('role')?.patchValue(this.prueba.usuario.role)
          this.editForm.get('state')?.patchValue(this.prueba.usuario.state)
          this.imageUrl = this.getImageUrl(this.user);
        }
      );
  }

  updateUser() {
    this.userService.updateUser({ uid: this.uid, ...this.editForm.value }).
      subscribe(res => {
        if (res === true) {
          Swal.fire({
            icon: 'success',
            title: 'La información se actualizo de forma exitosa',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire("Se detecto un error al actualizar");
        }
      })
  }

  changeImage(event: any) {
    this.uploadImage = event?.target?.files[0];
    if (!this.uploadImage) { return; }
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(this.uploadImage);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
    this.updateImage()
  }

  updateImage() {
    this.fileUploadService.updateImage(this.uploadImage, 'usuarios', this.user.uid!).
      then(image => {
        this.user.img = image
      }).then(e => this.fileUploadService.setURLImageProfile(this.getImageUrl(this.user)))
  }

  getImageUrl(user: Usuario) {
    if (user.img) {
      return `${this._baseUrl}/upload/usuarios/${user.img}`;
    } else {
      return `${this._baseUrl}/upload/usuarios/no-image`;
    }
  }
}
