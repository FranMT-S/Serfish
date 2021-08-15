import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide:boolean=true;
  miFormulario:FormGroup = this.fb.group({
    email   : [,[Validators.required],[]],
    password: [,[Validators.required],[]]
  });

  constructor(  private fb:FormBuilder,
                private authService:AuthService,
                private router:Router ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      email:"jean.boquin.s@gmail.com",
      password:"pythonjs",
    })
  }

  login(){
    const {email, password} = this.miFormulario.value
    this.authService.login(email, password)
      .subscribe(ok =>{
        if(ok === true){
          this.router.navigateByUrl("/home-page");
        }else{
          Swal.fire({ background:'rgba(250,250,250,0.96)',
                      title: 'Oops!!',
                      text: `${ok}`,                  
                      icon: 'error',
                      confirmButtonColor: '#3085d6'
          });
        }
      });
  }
  
  forgotPassword(){
    const {email} = this.miFormulario.value
    if(!this.validateEmail(email) || email == ""){
      const msg = (email==="")?'El email es un campo obligatorio.':'El correo electronico ingresado no es valido.'
      Swal.fire({   background:'rgba(250,250,250,0.96)',
                    title: 'Oops!!',
                    text: msg,                  
                    icon: 'warning',
                    confirmButtonColor: '#3085d6'
                  });
    }else{
      this.authService.forgotPassword(email)
        .subscribe(ok =>{
          if(ok === true){
            Swal.fire({
              background:'rgba(250,250,250,0.96)',
              title:'<p>Instrucciones enviadas</p>',
              html : `<p style="text-align:justify; margin: 0 20px;">Hemos enviado instrucciones para cambiar tu contraseña a ${email}. Revise la bandeja de entrada y la carpeta de spam.</p>`,
              icon: 'info',
              confirmButtonColor: '#3085d6'
            })
          }else{
            // console.log(ok)
            Swal.fire({ background:'rgba(250,250,250,0.96)',
            title: 'Oops!!',
            text: "El correo electronico no esta registrado.",                  
            icon: 'error',
            confirmButtonColor: '#3085d6'
          });
          }
      });
    }
  }

  validateEmail(email:string) {
    email = email.trim();
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
}
