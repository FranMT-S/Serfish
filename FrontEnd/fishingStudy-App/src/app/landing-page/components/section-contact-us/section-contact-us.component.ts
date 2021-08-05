import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ContactUsService } from '../../services/contact-us.service';


@Component({
  selector: 'app-section-contact-us',
  templateUrl: './section-contact-us.component.html',
  styleUrls: ['./section-contact-us.component.css']
})
export class SectionContactUsComponent implements OnInit {

  contactUsMail: FormGroup = this.fb.group({
    nombre: ["", [Validators.required], []],
    email: ["", [Validators.required, Validators.email], []],
    organizacion: ["", [Validators.required], []],
    mensaje: ["", [Validators.required], []]
  });

  constructor(private fb: FormBuilder, 
    private contactUsService:ContactUsService) { }

  ngOnInit(): void {
    this.contactUsMail.reset({
      nombre: "",
      email: "",
      organizacion: "",
      mensaje: "",
    })
  }

  mail(formDirective: FormGroupDirective){
    const { nombre, email, organizacion, mensaje } = this.contactUsMail.value;
    //console.log(nombre, email, organizacion, mensaje);
    this.contactUsService.sendContactInfo(nombre, email, organizacion, mensaje).subscribe(ok => {
      if (ok === true) {
        Swal.fire({
          background: 'rgba(250,250,250,0.96)',
          title: '<p>¡Enviado con exito!</p>',
          html: `<p style="text-align: left; margin: 0 20px;">Gracias ${nombre} por ponerse en contacto con nosotros, en breves nos contactaremos con usted a traves de su correo (${email}). <br><br><small style="    font-size: 0.8em;
    color: gray;">Revise la bandeja de entrada y la carpeta de spam.</style></p>`,
          icon: 'info',
          confirmButtonColor: '#3085d6'
        })
      } else {
        // console.log(ok)
        Swal.fire({
          background: 'rgba(250,250,250,0.96)',
          title: 'Oops!!',
          text: "Ocurrio un error. disculpanos, parece que algo salio mal. Puedes contactarnos a traves de nuestro correo (serfishsw@gmail.com).",
          icon: 'error',
          confirmButtonColor: '#3085d6'
        });
      }
    });

    formDirective.resetForm();
    this.contactUsMail.reset();
  }
}
