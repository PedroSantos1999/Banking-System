import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  constructor(private builder: FormBuilder, private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService,
    private dialogue: MatDialogRef<DepositComponent>) {

  }
  editdata: any;
  movements: any;
  description = '';

  ngOnInit(): void {
    if (this.data.usercode != null || this.data.usercode != '') {
      this.service.Getbycode(this.data.usercode).subscribe(res => {
        this.editdata = res;
        this.registerform.setValue({ id: this.editdata.id, name: this.editdata.name, password: this.editdata.password, email: this.editdata.email, total: this.editdata.total })
      });
    }
  }

  registerform = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    total: this.builder.control(10000, Validators.required)
  });

  transactionform = this.builder.group({
    id: this.builder.control(0),
    username: this.builder.control(''),
    description: this.builder.control(''),
    amount: this.builder.control(0, Validators.required)
  });

  depositUser() {
    const value = Number(this.editdata.total) + Number(this.registerform.value.total);
    this.description = this.editdata.id + ' made a deposit.';
    const amount = String(this.registerform.value.total);
    this.service.GetAllTransactions().subscribe(res => {
      this.movements = res;
    });

    this.registerform.setValue({ id: this.editdata.id, name: this.editdata.name, password: this.editdata.password, email: this.editdata.email, total: Number(value) })
    this.transactionform.setValue({id: 0, username: this.editdata.id, description: this.description, amount: Number(amount) })
    this.service.Updateuser(this.registerform.value.id, this.registerform.value).subscribe(res => {
      this.toastr.success('The deposit was a success');
      this.dialogue.close();
    });;
    console.log(this.transactionform.value);
    this.service.Proceedtransaction(this.transactionform.value).subscribe(res => {
    });
  }

}
