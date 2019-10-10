import { Component, OnInit, Output } from '@angular/core';
import { LoginService } from '../login.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedin:boolean = false;
  permissionLA:boolean = false;
  permissionPro:boolean = false;
  permissionAdm:boolean = false;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    
  }

  login(email, password){
    let loginCreds = {
      email: email,
      password: password
    }
    this.loginService.loginUser(loginCreds).subscribe((auth:any) =>{
      sessionStorage.setItem('auth', JSON.stringify(auth.auth));
      if(auth != null){
        this.loggedin = true;
      }
      console.log('event emitted: {"loggedin": true, "permissions":"'+auth.auth.permissions+'"}');
      // window.location.replace('getHelp');
    });

  }


}
