import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const urlGetListUser  = "http://localhost:19776/api/user/getAll-user"
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  GetListUser():Observable<Object[]> {
    return this.http.get<Object[]>(urlGetListUser).pipe(
      tap(() => console.log("OK")
      )
    )
  }
}
