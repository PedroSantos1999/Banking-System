import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent {

  constructor(private service: AuthService, private builder: FormBuilder, private toastr: ToastrService, private dialogue: MatDialog) {
    this.Loadmovements();
  }
  movements: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  usernamedata = '';
  descriptiondata = '';
  amountdata = '';

  Loadmovements() {
    this.service.GetAllTransactions().subscribe(res => {
      this.movements = res;
      this.dataSource = new MatTableDataSource(this.movements);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  displayedColumns: string[] = ['username', 'description', 'amount'];

}
