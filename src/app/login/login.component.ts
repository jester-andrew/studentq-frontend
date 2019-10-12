import { Component, OnInit, Output } from '@angular/core';
import { LoginService } from '../login.service';
import { EventEmitter } from 'events';
import { Router } from '@angular/router';

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
  constructor(private loginService: LoginService, private router:Router) { }

  ngOnInit() {
    
  }

  login(email, password){
    let loginCreds = {
      email: email,
      password: password
    }
    this.loginService.loginUser(loginCreds).subscribe((auth:any) =>{
      sessionStorage.setItem('auth', JSON.stringify(auth.auth));
      let permissions = {
        loggedin: false,
        permissionsLA:false,
        permissionPro:false,
        permissionAdm:false
      }

      if(auth != null){
        permissions.loggedin = true;
      }

      if(auth.auth.permissions == 'Lab Assistant'){
        permissions.permissionsLA = true;
      }

      if(auth.auth.permissions == 'Professor'){
        permissions.permissionPro = true;
      }

      if(auth.auth.permissions == 'Admin'){
        permissions.permissionAdm = true;
      }

      this.loginService.editPermissions(permissions);
      
      this.router.navigate(['getHelp']);
    });

  }


}
