import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  // private domain:string = 'http://localhost:5000/';
  private domain:string = 'https://vast-mesa-84900.herokuapp.com/';

  constructor() { }

  getDomain(){
    return this.domain;
  }
}
