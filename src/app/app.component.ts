import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  
  title = 'studentq';
  loggedinInfo;
  loggedin:boolean = false;
  permissionLA:boolean = false;
  permissionPro:boolean = false;
  permissionAdm:boolean = false;

  @ViewChild(LoginComponent) login;

  ngAfterViewInit(): void {
    this.loggedin = this.login.loggedin;
  }


  fixNavigation(data){
    console.log('being called');
    this.loggedinInfo = JSON.parse(data);

    this.loggedin = this.loggedinInfo.loggedin
  }
}
