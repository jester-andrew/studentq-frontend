import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private domain:string = 'http://localhost:5000/' /*|| 'https://vast-mesa-84900.herokuapp.com/'*/; 
  private addAdminAPI:string = this.domain + 'addAdmin';
  private deleteAdminAPI:string = this.domain + 'deleteAdmin';

  constructor(private http: HttpClient) { }

  addAdmin(admin){
    let body = JSON.stringify(admin);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    return this.http.post(this.addAdminAPI, body, options);
  }

  removeAdmin(id){
    let body = JSON.stringify({id:id});
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    return this.http.post(this.deleteAdminAPI, body, options);
  }
}
