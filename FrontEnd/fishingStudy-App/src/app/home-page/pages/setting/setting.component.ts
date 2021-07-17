import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
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
}

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  selected:string=""

  miFormulario:FormGroup = this.fb.group({
    name    :["", [Validators.required], []],
    email   :["", [Validators.required], []],
    password:["", [Validators.required], []],
    role    :["", [Validators.required], []],
  });

  displayedColumns: string[] = ['index', 'name', 'email', 'role'];
  dataSource = new MatTableDataSource<Usuario>();
  lengthDataSource:number=0;
  // @ViewChild('table') table!: MatTable<Element>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private fb:FormBuilder,
               private authService:AuthService,
               private userServices:UserService ) { }
               
  ngOnInit(): void {
    if( this.userServices.getUsersArray.length===0 ){
      this.userServices.getUsers()
      .subscribe(res => {
        console.log(res);
        this.dataSource.data = res;
        this.lengthDataSource = res.length;
      });
    }else{
      this.dataSource.data = this.userServices.getUsersArray;
      this.lengthDataSource = this.dataSource.data.length;
    }
  }

  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  register(){
    this.authService.register(this.miFormulario)
      .subscribe(ok=>{
        if(ok===true){
          Swal.fire({
            icon: 'success',
            title: 'El usuario se creo de forma exitosa',
            showConfirmButton: false,
            timer: 1500
          });
        }else{
          Swal.fire("Detectamos un error.",`${ok}`,"error");
        }
      });
  }

  colorRole(role:string){
    return (role=="admin")?"accent":(role=="biologo")?"primary":"basic"
  }
}
