import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  apiurl = 'http://localhost:3000/user';
  apitrurl = 'http://localhost:3000/transaction';

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  GetAll() {
    return this.http.get(this.apiurl);
  }
  Getbycode(code: any) {
    return this.http.get(this.apiurl + '/' + code);
  }
  Proceedregister(inputdata: any) {
    return this.http.post(this.apiurl, inputdata);
  }
  Updateuser(code: any, inputdata: any) {
    return this.http.put(this.apiurl + '/' + code, inputdata)
    .pipe(tap(() => {
      this._refreshNeeded$.next();
    }));
  }
  IsloggedIn(){
    return sessionStorage.getItem('username');
  }
  GetTotalValue(){
    return sessionStorage.getItem('total');
  }

  GetAllTransactions(){
    return this.http.get(this.apitrurl);
  }
  Proceedtransaction(inputdata: any) {
    return this.http.post(this.apitrurl, inputdata);
  }
}
