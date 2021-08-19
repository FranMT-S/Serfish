import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { datoBiologico } from '../interface/interface';

import { SurveyService } from '../../../services/survey.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  
  constructor(private fb: FormBuilder, private surveyService: SurveyService) { }

  survey!: FormGroup;
  especies: datoBiologico[] = [];
  displayedColumns: string[] = ["index","nombreComun", "nombreCientifico", "familia", "genero", "especie", "sexo", "longitudHorquilla", "pesoGr", "action"]
  selected = "";

  ngOnInit(): void {
    this.survey = this.fb.group({
      "comunidad": ["", Validators.required],
      "no_nombreComun": ["", Validators.required],
      "no_nombreCientifico": ["", Validators.required],
      "no_familia": ["", Validators.required],
      "no_genero": ["", Validators.required],
      "no_especie": ["", Validators.required],
      "no_sexo": ["", Validators.required],
      "no_longitudHorquilla": ["", Validators.required],
      "no_pesoGr": ["", Validators.required]
    })
  }

  eliminar(idx: any){
    //console.log(this.especies[idx])
    Swal.fire({
      title: 'Borrar record',
      text: "¿Esta seguro que desea eliminar este record?",
      icon: 'question',
      iconColor: '#3085d6',
      showCancelButton: true,
      confirmButtonColor: '#2F6FC6',
      cancelButtonColor: '#2F6FC6',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.especies.splice(idx, 1);
          Swal.fire({
            title: 'Eliminado!',
            text: 'Record eliminado correctamente',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        });
      }
    })
  }

  especieValida():any{
    return this.survey?.get("no_nombreComun")?.valid &&
    this.survey?.get("no_nombreCientifico")?.valid &&
    this.survey?.get("no_familia")?.valid &&
    this.survey?.get("no_genero")?.valid &&
    this.survey?.get("no_especie")?.valid &&
    this.survey?.get("no_longitudHorquilla")?.valid &&
    this.survey?.get("no_pesoGr")?.valid &&
    this.selected != ""
  }

  clearEspeciesForm(formDirective: FormGroupDirective){
    this.survey?.get("no_nombreComun")?.setValue("");
    this.survey?.get("no_nombreCientifico")?.setValue("");
    this.survey?.get("no_familia")?.setValue("");
    this.survey?.get("no_genero")?.setValue("");
    this.survey?.get("no_especie")?.setValue("");
    this.survey?.get("no_longitudHorquilla")?.setValue("");
    this.survey?.get("no_pesoGr")?.setValue("");
    this.selected = "";
    formDirective.resetForm()
  }

  addEspecie(formDirective: FormGroupDirective){

    const payload = {
      "nombreComun": this.survey?.get("no_nombreComun")?.value,
      "nombreCientifico": this.survey?.get("no_nombreCientifico")?.value,
      "familia": this.survey?.get("no_familia")?.value,
      "genero": this.survey?.get("no_genero")?.value,
      "especie": this.survey?.get("no_especie")?.value,
      "sexo": this.selected,
      "longitudHorquilla": this.survey?.get("no_longitudHorquilla")?.value,
      "pesoGr": this.survey?.get("no_pesoGr")?.value
    };
    this.especies.push(payload);
    const comunidad = this.survey?.get("comunidad")?.value;
    const nombreComun = this.survey?.get("no_nombreComun")?.value;
    const nombreCientifico = this.survey?.get("no_nombreCientifico")?.value;
    const familia = this.survey?.get("no_familia")?.value;
    const genero = this.survey?.get("no_genero")?.value;
    const especie = this.survey?.get("no_especie")?.value;
    this.selected = "";
    formDirective.reset()
    this.survey?.get("comunidad")?.setValue(comunidad);
    this.survey?.get("no_nombreComun")?.setValue(nombreComun);
    this.survey?.get("no_nombreCientifico")?.setValue(nombreCientifico);
    this.survey?.get("no_familia")?.setValue(familia);
    this.survey?.get("no_genero")?.setValue(genero);
    this.survey?.get("no_especie")?.setValue(especie);

    //console.log(this.survey?.get("comunidad"))
  } 

  editEspecie(idx: any){
    const data = this.especies.splice(idx, 1);
    this.survey?.get("no_nombreComun")?.setValue(data[0].nombreComun);
    this.survey?.get("no_nombreCientifico")?.setValue(data[0].nombreCientifico);
    this.survey?.get("no_familia")?.setValue(data[0].familia);
    this.survey?.get("no_genero")?.setValue(data[0].genero);
    this.selected = data[0].sexo;
    this.survey?.get("no_especie")?.setValue(data[0].especie);
    this.survey?.get("no_longitudHorquilla")?.setValue(data[0].longitudHorquilla);
    this.survey?.get("no_pesoGr")?.setValue(data[0].pesoGr);

    Swal.fire({
      icon: 'success',
      title: 'Puede editar los datos en el formulario.',
      showConfirmButton: true
    })
  }

  send(formDirective: FormGroupDirective){
    const payload = {
      comunidad: this.survey.value.comunidad,
      especies: this.especies
    }
    this.surveyService.registrarEncuesta(payload).
      subscribe(res => {
        if (res) {
          Swal.fire({
            icon: 'success',
            title: 'Encuesta enviada exitosamente.',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.selected = "";
            this.especies = [];
            formDirective.resetForm();
            this.survey.reset();
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Se detecto un error al enviar la encuesta',
            text: 'Verifique los datos ingresados'
          }
          );
        }
      });
  }

}
