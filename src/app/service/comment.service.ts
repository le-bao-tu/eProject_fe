import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
const urlGetListComment = "http://localhost:19776/api/Comment/getAll-comment"
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }

  GetListAddressAccount():Observable<Object[]> {
    return this.http.get<Object[]>(urlGetListComment).pipe(
      tap(() => console.log("OK"))
    )
  }
}
