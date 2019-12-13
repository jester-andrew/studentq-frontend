import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LabInfoService {

  private domain:string = /*'http://localhost:5000/' ||*/ 'https://vast-mesa-84900.herokuapp.com/'; 
  private loginAPI:string = this.domain + 'getlabInfo';
  private updateAPI:string = this.domain + 'updatelabInfo';
  private systemInit:string = this.domain + 'init';

  constructor(private http: HttpClient) { }

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
