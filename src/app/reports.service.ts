import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private domain:string = /*'http://localhost:5000/' ||*/ 'https://vast-mesa-84900.herokuapp.com/'; 
  private bulkReportAPI = this.domain + 'bulkReport';
  constructor(private http: HttpClient) { }

  getBulkReport(){
    let auth = JSON.parse(sessionStorage.getItem('auth'));
    let body = JSON.stringify({ lab: auth.lab});
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

        
    return this.http.post(this.bulkReportAPI, body, options);
  }
}
