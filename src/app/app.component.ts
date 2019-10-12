import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'studentq';
  loggedinInfo;
  loggedin:boolean = false;
  permissionLA:boolean = false;
  permissionPro:boolean = false;
  permissionAdm:boolean = false;

  constructor(private loginBroadcast:LoginService){}
  ngOnInit(): void {
    this.loginBroadcast.brodcast.subscribe((permissions:any) =>{
        this.loggedin = permissions.loggedin;
        this.permissionLA = permissions.permissionsLA;
        this.permissionPro = permissions.permissionPro;
        this.permissionAdm = permissions.permissionAdm;
    });
  }


  logout(){
    this.loggedin = false;
    this.permissionAdm = false;
    this.permissionPro = false;
    this.permissionLA = false;

    sessionStorage.removeItem('auth');
  }

}
