//import { CanActivateFn } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
/*
export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
*/
export class AuthGuard implements CanActivate {
  constructor(private service: AuthService, private router: Router, private toastr: ToastrService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.service.IsloggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }

  }

}