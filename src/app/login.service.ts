import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private domain:string = /*'http://localhost:5000/' ||*/ 'https://vast-mesa-84900.herokuapp.com/'; 
  private loginAPI:string = this.domain + 'login';
  private appPermissions:BehaviorSubject<String> = new BehaviorSubject<String>('{loggedin: false,permissionsLA:false,permissionPro:false,permissionAdm:false}');
  private taPermission:BehaviorSubject<String> = new BehaviorSubject<String>('{ta: false}');
  brodcast = this.appPermissions.asObservable();
  broadcastTA = this.taPermission.asObservable();

  constructor(private http: HttpClient) { 
    
  }

  public loginUser(creds){
    let body = JSON.stringify(creds);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    return this.http.post(this.loginAPI, body, options);
  }

  editPermissions(newPermissions){
    this.appPermissions.next(newPermissions);
  }

  tapermission(newPermision){
    this.taPermission.next(newPermision);
  }

  isLoggedin(){
    return (sessionStorage.getItem('auth') != null);
  }

  isInstructor(){
    if(this.isLoggedin()){
      let auth = JSON.parse(sessionStorage.getItem('auth'));
      return auth.permissions == "Professor";
    }else{
      return false;
    }
  }

  getAuthorizedLab(){
    if(this.isLoggedin()){
      let auth = JSON.parse(sessionStorage.getItem('auth'));
      return auth.lab;
    }else{
      return null;
    }
  }

}
