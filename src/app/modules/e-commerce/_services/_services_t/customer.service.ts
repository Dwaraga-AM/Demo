import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseModel } from "src/app/_metronic/shared/crud-table";

@Injectable({
    providedIn: 'root'
  })
export class ContactService{
    constructor (private http:HttpClient){ }

    fetch():Observable<BaseModel>{
     return this.http.get<BaseModel>('http://localhost:3000/api/customer/list');
    }

}