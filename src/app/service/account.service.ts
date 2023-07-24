import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
const urlLogin = "https://localhost:44328/api/user/login";
const urlgetByNameTokenLogin = "https://localhost:44328/api/user/get-by-name-token";
const urlGetListUser = "https://localhost:44337/api/HNI/getlist-user"

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  LoginAccount(data:Object):Observable<Object> {
    return this.http.post<Object>(urlLogin,data)
  }

  GetListAccount(data:Object):Observable<Object> {
    return this.http.post<Object>(urlGetListUser,data)
  }

  GetByNameToken(email:string):Observable<Object> {
    return this.http.get<Object>(urlgetByNameTokenLogin+`?email=${email}`).pipe(
         tap(() => console.log("OK"),
      )
    )
  }
}
