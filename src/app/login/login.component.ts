import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  login(email, password){
    let loginCreds = {
      email: email,
      password: password
    }
    console.log(loginCreds)
    this.loginService.loginUser(loginCreds).subscribe((auth:any) =>{
      sessionStorage.setItem('auth', auth.auth);
    });

  }

}
