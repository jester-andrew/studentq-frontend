import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class QueServiceService {
  domain:string = 'http://localhost:5000/' /*|| 'https://vast-mesa-84900.herokuapp.com/'*/; 
  getHelpRequestAPI:string = this.domain + 'que';
  insertRestAPI:string = this.domain + 'enterq';
  getLabsAPI:string = this.domain + 'getLabs';
  removeAPI:string = this.domain + 'removeq';

  public getRequest = () => {
    return Observable.create((observer) => {
        this.socket.on('add', (request) => {
            observer.next(request);
        });
    });
  }

  private socket;
  constructor(private http: HttpClient) { 
    this.socket = io(this.domain);
  }

  getRequests(dbCollectionAlias){
    let body = JSON.stringify({ collection: dbCollectionAlias});
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };

        return this.http.post(this.getHelpRequestAPI, body, options);
  }

  insertRequest(request){
    let innerBody = {
      collection: request.collection
    }
    request.body = innerBody;
    let body = JSON.stringify(request);
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // let options = { headers: headers };
    // console.log(this.socket);
    this.socket.emit('add', body);
    //return this.http.post(this.insertRestAPI, body, options);
  }

  getLabs(){
    return this.http.get(this.getLabsAPI);
  }

  deleteRequest(id, dbAlias){
    let body = JSON.stringify({
      id: id,
      collection: dbAlias,
      body: {
        id: id,
        collection: dbAlias,
      }
    });

    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // let options = { headers: headers };

    //return this.http.post(this.removeAPI, body, options);

    this.socket.emit('remove', body);

  }
}
