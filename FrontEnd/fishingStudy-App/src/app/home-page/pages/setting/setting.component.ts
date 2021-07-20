import { Component, OnInit, QueryList, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

interface Usuario{
  index?  :number;
  role    :string;
  name    :string;
  email   :string;
  uid     :string;
  state   ?:Boolean;
}

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  selected:string=""
  selectedIndex = 0;
  hide: boolean = true;
  miFormulario:FormGroup = this.fb.group({
    name    :["", [Validators.required], []],
    email   :["", [Validators.required], []],
    password:["", [Validators.required], []],
    role    :["", [Validators.required], []],
  });

  displayedColumns: string[] = ['index', 'name', 'email', 'role','action'];
  dataSource = new MatTableDataSource<Usuario>();
  dataDisableSource = new MatTableDataSource<Usuario>();
  lengthDataSource:number=0;
  lengthDataDisableSource:number=0;
  // @ViewChild('table') table!: MatTable<Element>;
  
  @ViewChild('TableOneSort', {static: true}) sort!:MatSort;
  @ViewChild('TableOnePaginator', {static: true}) paginator!:MatPaginator;

  @ViewChild('TableTwoSort', {static: true}) sortDisable!:MatSort;
  @ViewChild('TableTwoPaginator', {static: true}) paginatorDisable!:MatPaginator;

  constructor( private fb:FormBuilder,
               private authService:AuthService,
               private userServices:UserService ) { }
               
  ngOnInit(): void {
    if( this.userServices.getUsersArray.length===0 ){
      this.userServices.getUsers()
      .subscribe(res => {
        /*/ console.log(res);
        this.dataSource.data = res;
        this.lengthDataSource = res.length;*/
        console.log("arreglo",res[0]);
        this.dataSource.data = res.filter(e => e.state); 
        this.dataDisableSource.data = res.filter(e => !e.state);        
        this.lengthDataSource = res.filter(e => e.state).length;
        this.lengthDataDisableSource = res.filter(e => !e.state).length
      });
    }else{
      this.dataSource.data = this.userServices.getUsersArray;
      this.lengthDataSource = this.dataSource.data.length;
    }
  }

  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataDisableSource.paginator = this.paginatorDisable;
      this.dataDisableSource.sort = this.sortDisable;


  }
  
  register(formDirective: FormGroupDirective){
    this.authService.register(this.miFormulario)
      .subscribe(ok=>{
        if(ok===true){
          Swal.fire({
            icon: 'success',
            title: 'El usuario se creo de forma exitosa',
            showConfirmButton: false,
            timer: 1500
          }).then((result) => {
            // luego de registrar, limpia el formulario y enseña los usuarios
            this.lengthDataSource = 0;
            // TODO: solo obtener el ultimo usuario y añadirlo al arreglo
            this.userServices.getUsers()
              .subscribe(res => {
                this.dataSource.data = res;
                this.lengthDataSource = res.length;
              });
            /*
              // ! no funciona correctamente aun
              this.userServices.getUsers(last = 'true') //obtener solo el ultimo
              .subscribe(res => {
                console.log(res);
                this.dataSource.data = res;
                this.lengthDataSource = res.length;
              });
            */
            this.selected = "";
            formDirective.resetForm();
            this.miFormulario.reset();
            this.selectedIndex = 0;
          });
          
        }else{
          Swal.fire("Detectamos un error.",`${ok}`,"error");
        }
      });
  }

  colorRole(role:string){
    return (role=="admin")?"accent":(role=="biologo")?"primary":"basic"
  }

  disabledUser(id:string){

    this.userServices.changeState(id,false)
    .subscribe(res =>{      
        
        this.dataDisableSource.data = this.dataDisableSource.data.concat(
                                   this.dataSource
                                   .data.filter(e => e.uid == res.uid)
                                  ).sort(
                                    (a,b) => {
                                      return (a.index!.valueOf() > b.index!.valueOf())?1:(a.index!.valueOf() < b.index!.valueOf())?-1:0;
                                    }
                                  )
        

        
        this.dataSource.data = this.dataSource.data
                                .filter(e => e.uid != res.uid)
                                .sort((a,b) => {
                                  return (a.index!.valueOf() > b.index!.valueOf())?1:(a.index!.valueOf() < b.index!.valueOf())?-1:0;
                                }) 

        this.lengthDataSource = this.dataSource.data.length;
        this.lengthDataDisableSource = this.dataDisableSource.data.length;

    });
  }

  enabledUser(id:string){
    this.userServices.changeState(id,true)
    .subscribe(res =>{
        this.dataSource.data = this.dataSource.data.concat(
                                   this.dataDisableSource.data
                                   .filter(e => e.uid == res.uid)
                                   ).sort((a,b) => {
                                    return (a.index!.valueOf() > b.index!.valueOf())?1:(a.index!.valueOf() < b.index!.valueOf())?-1:0;
                                  })

        
        this.dataDisableSource.data = this.dataDisableSource
                                        .data
                                        .filter(e => e.uid != res.uid)
                                        .sort((a,b) => {
                                          return (a.index!.valueOf() > b.index!.valueOf())?1:(a.index!.valueOf() < b.index!.valueOf())?-1:0;
                                        })
        this.lengthDataSource = this.dataSource.data.length;
        this.lengthDataDisableSource = this.dataDisableSource.data.length;

    });
  }



}
