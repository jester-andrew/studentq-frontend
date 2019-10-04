import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueServiceService {
  domain:string = 'http://localhost:5000/' /*|| 'https://vast-mesa-84900.herokuapp.com/'*/; 
  getHelpRequestAPI:string = this.domain + 'que';
  insertRestAPI:string = this.domain + 'enterq';
  getLabsAPI:string = this.domain + 'getLabs';
  constructor(private http: HttpClient) { }

  getRequests(dbCollectionAlias){
    let body = JSON.stringify({ collection: dbCollectionAlias});
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };

        return this.http.post(this.getHelpRequestAPI, body, options);
  }

  insertRequest(request){
    let body = JSON.stringify(request);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    return this.http.post(this.insertRestAPI, body, options);
  }

  getLabs(){
    return this.http.get(this.getLabsAPI);
  }
}
