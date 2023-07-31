import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const urlGetListPayment = "http://localhost:19776/api/Payment/getall-payment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  GetListPayment():Observable<Object[]> {
    return this.http.get<Object[]>(urlGetListPayment).pipe(
      tap(() => console.log("OK"))
    )
  }
}
