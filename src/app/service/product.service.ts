import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const urlGetListProduct = "http://localhost:19776/api/Product/getall-product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  GetListProducr():Observable<Object[]> {
    return this.http.get<Object[]>(urlGetListProduct).pipe(
      tap(() => console.log("OK"))
    )
  }
}
