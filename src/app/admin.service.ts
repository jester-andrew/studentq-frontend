import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomainService } from './domain.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private domain:string = this.ds.getDomain();
  private addAdminAPI:string = this.domain + 'addAdmin';
  private deleteAdminAPI:string = this.domain + 'deleteAdmin';
  private getAdminAPI:string = this.domain + 'getAdmin';

  constructor(private http: HttpClient, private ds:DomainService) { }

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

  getAdmins(group){
    let body = JSON.stringify({group:group});
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    return this.http.post(this.getAdminAPI, body, options);
  }
}
