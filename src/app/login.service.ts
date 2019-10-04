import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  domain:string = 'http://localhost:5000/' /*|| 'https://vast-mesa-84900.herokuapp.com/'*/; 
  loginAPI:string = this.domain + 'login';

  constructor(private http: HttpClient) { }

  public loginUser(creds){
    let body = JSON.stringify(creds);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    return this.http.post(this.loginAPI, body, options);
  }
}
