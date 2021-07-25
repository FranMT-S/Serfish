import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../../../interfaces/interfaces';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {

  @Input() data!:MatTableDataSource<Usuario>; 
  @Input() icon!:string;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  displayedColumns: string[] = ['index', 'name', 'email', 'role', 'action'];
  dataSource = new MatTableDataSource<Usuario>();
  lengthDataSource: number = 0;
  
  constructor(  private userService:UserService,
                private router: Router 
              ) { }

  async ngOnInit() {
    this.dataSource=this.data;
    await this.getLengthData(this.data);
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  colorRole(role: string) {
    return (role == "admin") ? "accent" : (role == "biologo") ? "primary" : "basic"
  }

  getLengthData(dt:MatTableDataSource<Usuario>){
    return new Promise((resolve)=>{
      setTimeout(()=>{
        this.lengthDataSource=dt.data.length
        resolve(true);
      },500)
    })
  }

  editUser(uid:string){
    this.router.navigateByUrl(`/home-page/edit-profile/${uid}`)
    console.log(uid)
    // this.userService.getUsers(uid)
    //   .subscribe(console.log)
  }
}
