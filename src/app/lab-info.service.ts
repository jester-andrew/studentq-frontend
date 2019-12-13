import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomainService } from './domain.service';

@Injectable({
  providedIn: 'root'
})
export class LabInfoService {

  private domain:string = this.ds.getDomain(); 
  private loginAPI:string = this.domain + 'getlabInfo';
  private updateAPI:string = this.domain + 'updatelabInfo';
  private systemInit:string = this.domain + 'init';

  constructor(private http: HttpClient, private ds:DomainService) { }

  getInfo(){
    return this.http.get(this.loginAPI);
  }

  updateLabInfo(request){
      let body = JSON.stringify(request);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let options = { headers: headers };

      return this.http.post(this.updateAPI, body, options);
  }

  systemSetup(sysDate){
      let body = JSON.stringify({sysDate});
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let options = { headers: headers };

      return this.http.post(this.systemInit, body, options);
  }
}
