import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService, private router: Router) {
    sessionStorage.clear();
  }

  userdata: any;

  loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  proceedlogin() {
    if (this.loginform.valid) {
      this.service.Getbycode(this.loginform.value.username).subscribe(res => {
        this.userdata = res;
        console.log(this.userdata);
        if (this.userdata.password == this.loginform.value.password) {
          sessionStorage.setItem('username', this.userdata.id);
          sessionStorage.setItem('name', this.userdata.name);
          sessionStorage.setItem('email', this.userdata.email);
          sessionStorage.setItem('total', this.userdata.total);
          this.router.navigate(['']);
        } else {
          this.toastr.error('The credentials are invalid')
        }
      });
    }
  }

}
