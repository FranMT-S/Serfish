import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from '../../interfaces/interfaces';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  selected: string = ""
  selectedIndex = 0;
  hide: boolean = true;
  miFormulario: FormGroup = this.fb.group({
    name: ["", [Validators.required], []],
    email: ["", [Validators.required], []],
    password: ["", [Validators.required], []],
    role: ["", [Validators.required], []],
  });

  dataSource = new MatTableDataSource<Usuario>();
  dataDisableSource = new MatTableDataSource<Usuario>();

  constructor(  private fb: FormBuilder,
                private authService: AuthService,
                private userServices: UserService,
              ) { }

  ngOnInit(): void {
    this.userServices.getUsers()
      .subscribe( () => {
        this.dataSource.data = this.userServices.getEnableUsers;
        this.dataDisableSource.data = this.userServices.getDisableUsers;
      });
  }

  register() {
    this.authService.register(this.miFormulario)
      .subscribe(ok => {
        if (ok === true) {
          Swal.fire({
            icon: 'success',
            title: 'El usuario se creo de forma exitosa',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire("Detectamos un error.", `${ok}`, "error");
        }
      });
  }

  updateTables(user:Usuario){
    console.log("En el padre")
    const {index, ...fieldsUpdate} = user
    fieldsUpdate.state=!fieldsUpdate.state;
    this.userServices.updateUser(fieldsUpdate)
      .subscribe()
    this.userServices.updateArrayUsers=fieldsUpdate;
    this.dataSource.data = this.userServices.getEnableUsers;
    this.dataDisableSource.data = this.userServices.getDisableUsers;
  }

}


// @ViewChild('TableOneSort', {static: true}) sort!:MatSort;
// @ViewChild('TableOnePaginator', {static: true}) paginator!:MatPaginator;

// @ViewChild('TableTwoSort', {static: true}) sortDisable!:MatSort;
// @ViewChild('TableTwoPaginator', {static: true}) paginatorDisable!:MatPaginator;

// constructor( private fb:FormBuilder,
//              private authService:AuthService,
//              private userServices:UserService,
//              private router: Router ) { }

// ngOnInit(): void {
//   if( this.userServices.getUsersArray.length===0 ){
//     this.userServices.getUsers()
//     .subscribe(res => {
//       /*/ console.log(res);*/
//     //console.log("res", res);
//     this.dataSource.data = res.filter(e => e.state);
//     this.dataDisableSource.data = res.filter(e => !e.state);
//     this.lengthDataSource = res.filter(e => e.state).length;
//     this.lengthDataDisableSource = res.filter(e => !e.state).length
//     // cambiando indices de elementos
//     this.dataSource.data.forEach((element, index) => { element.index = index + 1 });
//     this.dataDisableSource.data.forEach((element, index) => { element.index = index + 1 });
//     });
//   }else{
//     this.dataSource.data = this.userServices.getUsersArray.filter(e=>e.state);
//     this.dataDisableSource.data = this.userServices.getUsersArray.filter(e=>!e.state);
//     this.lengthDataSource = this.dataSource.data.filter(e => e.state).length;
//     this.lengthDataDisableSource = this.dataSource.data.filter(e => !e.state).length;
//     // cambiando indices de elementos
//     this.dataSource.data.forEach((element, index) => { element.index = index + 1 });
//     this.dataDisableSource.data.forEach((element, index) => { element.index = index + 1 });
//   }
// }

// ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;

//     this.dataDisableSource.paginator = this.paginatorDisable;
//     this.dataDisableSource.sort = this.sortDisable;


// }

// refresh(){
//   this.userServices.getUsers()
//     .subscribe(res => {
//       /*/ console.log(res);*/
//       //console.log("res", res);
//       this.dataSource.data = res.filter(e => e.state);
//       this.dataDisableSource.data = res.filter(e => !e.state);
//       this.lengthDataSource = res.filter(e => e.state).length;
//       this.lengthDataDisableSource = res.filter(e => !e.state).length
//       // cambiando indices de elementos
//       this.dataSource.data.forEach((element, index) => { element.index = index + 1 });
//       this.dataDisableSource.data.forEach((element, index) => { element.index = index + 1 });
//     });
// }

// register(formDirective: FormGroupDirective){
//   this.authService.register(this.miFormulario)
//     .subscribe(ok=>{
//       if(ok===true){
//         Swal.fire({
//           icon: 'success',
//           title: 'El usuario se creo de forma exitosa',
//           showConfirmButton: false,
//           timer: 1500
//         }).then((result) => {
//           // luego de registrar, limpia el formulario y enseña los usuarios
//           this.lengthDataSource = 0;
//           // TODO: solo obtener el ultimo usuario y añadirlo al arreglo
//           this.userServices.getUsers()
//             .subscribe(res => {
//               this.dataSource.data = res;
//               this.lengthDataSource = res.length;
//             });
//           /*
//             // ! no funciona correctamente aun
//             this.userServices.getUsers(last = 'true') //obtener solo el ultimo
//             .subscribe(res => {
//               console.log(res);
//               this.dataSource.data = res;
//               this.lengthDataSource = res.length;
//             });
//           */
//           this.selected = "";
//           formDirective.resetForm();
//           this.miFormulario.reset();
//           this.selectedIndex = 0;
//         });

//       }else{
//         Swal.fire("Detectamos un error.",`${ok}`,"error");
//       }
//     });
// }

// colorRole(role:string){
//   return (role=="admin")?"accent":(role=="biologo")?"primary":"basic"
// }

// disabledUser(id:string){

//   this.userServices.changeState(id,false)
//   .subscribe(res =>{

//       this.dataDisableSource.data = this.dataDisableSource.data.concat(
//                                  this.dataSource
//                                  .data.filter(e => e.uid == res.uid)
//                                 ).sort(
//                                   (a,b) => {
//                                     return (a.index!.valueOf() > b.index!.valueOf())?1:(a.index!.valueOf() < b.index!.valueOf())?-1:0;
//                                   }
//                                 )



//       this.dataSource.data = this.dataSource.data
//                               .filter(e => e.uid != res.uid)
//                               .sort((a,b) => {
//                                 return (a.index!.valueOf() > b.index!.valueOf())?1:(a.index!.valueOf() < b.index!.valueOf())?-1:0;
//                               })

//       this.lengthDataSource = this.dataSource.data.length;
//       this.lengthDataDisableSource = this.dataDisableSource.data.length;

//   });
// }

// enabledUser(id:string){
//   this.userServices.changeState(id,true)
//   .subscribe(res =>{
//       this.dataSource.data = this.dataSource.data.concat(
//                                  this.dataDisableSource.data
//                                  .filter(e => e.uid == res.uid)
//                                  ).sort((a,b) => {
//                                   return (a.index!.valueOf() > b.index!.valueOf())?1:(a.index!.valueOf() < b.index!.valueOf())?-1:0;
//                                 })


//       this.dataDisableSource.data = this.dataDisableSource
//                                       .data
//                                       .filter(e => e.uid != res.uid)
//                                       .sort((a,b) => {
//                                         return (a.index!.valueOf() > b.index!.valueOf())?1:(a.index!.valueOf() < b.index!.valueOf())?-1:0;
//                                       })
//       this.lengthDataSource = this.dataSource.data.length;
//       this.lengthDataDisableSource = this.dataDisableSource.data.length;

//   });
// }

// edit(userId: string){
//   this.userServices.idModUser = userId;
//   this.router.navigateByUrl("home-page/edit-profile")
// }
