import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const urlGetListCategory = "http://localhost:19776/api/Category/getall-category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  GetListCategory():Observable<Object[]> {
    return this.http.get<Object[]>(urlGetListCategory).pipe(
      tap(() => console.log("OK"))
    )
  }
}
