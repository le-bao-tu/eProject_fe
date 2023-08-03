import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
const urlgetByNameTokenLogin = "http://localhost:19776/api/user/get-by-name-token";
const urlGetListAccount = "http://localhost:19776/api/Account/getall-account"

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  GetListAccount():Observable<Object> {
    return this.http.get<Object>(urlGetListAccount)
  }

  GetByNameToken(email:string):Observable<Object> {
    return this.http.get<Object>(urlgetByNameTokenLogin+`?email=${email}`).pipe(
         tap(() => console.log("OK"),
      )
    )
  }
}
