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
  updateRequestAPI:string = this.domain + 'updateRequest';
  saveSessionAPI:string = this.domain + 'saveSession';

  public getRequest = () => {
    return Observable.create((observer) => {
        this.socket.on('add', (request) => {
            observer.next(request);
        });
    });
  }

  public getRow = () => {
    return Observable.create((observer) => {
        this.socket.on('helping', row => {
          observer.next(row);
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
    this.socket.emit('add', body);
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

    this.socket.emit('remove', body);

  }

  updatRequest(id, collection, adminName){
    let body = JSON.stringify({
      id: id,
      collection: collection,
      name: adminName
    });
   this.socket.emit('update',body);
  }

  saveHelpSession(helpRequest, lab){
    let bodyObject = {session: helpRequest, file:lab}
    let body = JSON.stringify(bodyObject);

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    return this.http.post(this.saveSessionAPI, body, options);

  }
}
