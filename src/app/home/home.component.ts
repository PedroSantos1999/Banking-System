import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DepositComponent } from '../deposit/deposit.component';
import { WithdrawalComponent } from '../withdrawal/withdrawal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private service: AuthService, private builder: FormBuilder, private toastr: ToastrService, private dialogue: MatDialog) {
    this.Loadusers();
  }
  userdata: any;
  users: any;
  dataSource: any;
  loggedUser = '';
  loggedName = '';
  loggedEmail = '';

  loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required)
  });


  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  ngOnInit() {
    this.service.refreshNeeded$.subscribe(() => {
      this.Loadusers();
    });
    this.Loadusers();
  }
  Loadusers() {
    this.loggedUser = sessionStorage.getItem('username')!;
    this.loggedName = sessionStorage.getItem('name')!;
    this.loggedEmail = sessionStorage.getItem('email')!;
    
  }
/*
  Loadusers() {
    //this.service.GetAll().subscribe(res => {
    this.service.Getbycode(this.loginform.value.username).subscribe(res => {
      this.users = res;
      console.log(this.users);
      this.dataSource = new MatTableDataSource(this.users);
      this.loggedUser = sessionStorage.getItem('username')!;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
*/
  displayedColumns: string[] = ['username', 'name', 'email', 'total', 'deposit', 'withdrawal'];

  DepositUser(code: any) {
    this.dialogue.open(DepositComponent,{
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data:{
        usercode: code
      }
    })
  }

  opendialogueD(code: any){
    this.Loadusers();
  }

  WithdrawaltUser(code: any) {
    const popup = this.dialogue.open(WithdrawalComponent,{
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data:{
        usercode: code
      }
    })
    popup.afterClosed().subscribe(res => {

    });
  }

  opendialogueW(code: any){
    this.Loadusers();
  } 


}
