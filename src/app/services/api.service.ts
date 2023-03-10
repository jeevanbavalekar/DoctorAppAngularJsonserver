import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postDr(data: any) {
    return this.http.post<any>("http://localhost:3000/doctorList/", data);
  }

  getDr() {
    return this.http.get<any>("http://localhost:3000/doctorList/");
  }

  deleteDr(id: number) {
    return this.http.delete<any>("http://localhost:3000/doctorList/" + id).pipe(map((res: any) => {
      return res;
    }))
  }
}
