import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const urlGetListAddressAccount = "http://localhost:19776/api/Address/getall-address-account";

@Injectable({
  providedIn: 'root'
})
export class AddressAccountService {

  constructor(private http:HttpClient) { }

  GetListAddressAccount():Observable<Object[]> {
    return this.http.get<Object[]>(urlGetListAddressAccount).pipe(
      tap(() => console.log("OK"))
    )
  }
}
