import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { DomainService } from './domain.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private domain:string = this.ds.getDomain(); 
  private bulkReportAPI = this.domain + 'bulkReport';

  constructor(private http: HttpClient, private ds:DomainService) { }

  getBulkReport(){
    let auth = JSON.parse(sessionStorage.getItem('auth'));
    let body = JSON.stringify({ lab: auth.lab});
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

        
    return this.http.post(this.bulkReportAPI, body, options);
  }
}
