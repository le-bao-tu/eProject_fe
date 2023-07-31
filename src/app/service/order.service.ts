import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const urlGetListOrder = "http://localhost:19776/api/Order/getall-order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  GetListOrder():Observable<Object[]> {
    return this.http.get<Object[]>(urlGetListOrder).pipe(
      tap(() => console.log("OK"))
    )
  }
}
