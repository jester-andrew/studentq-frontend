import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LabInfoService {

  private domain:string = 'http://localhost:5000/' /*|| 'https://vast-mesa-84900.herokuapp.com/'*/; 
  private loginAPI:string = this.domain + 'getlabInfo';

  constructor(private http: HttpClient) { }

  getInfo(){
    return this.http.get(this.loginAPI);
  }
}
