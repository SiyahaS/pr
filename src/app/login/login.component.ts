import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  usernameControl = new FormControl('');
  passwordControl = new FormControl('');
  loginerr = false;
  registererr = false;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.http.post(`${environment.apiURL}/api/v1/users/login`, {
      username: this.usernameControl.value,
      password: this.passwordControl.value
    }).toPromise().then(result => {
      if (result['ok'] === true) {
        localStorage.setItem('token', Math.random().toString());
        this.router.navigateByUrl(`/users/${result['data']._id}/${result['data'].username}`);
        this.loginerr = false;
      } else {
        this.loginerr = true;
      }
    });
  }

  register() {
    this.http.post(`${environment.apiURL}/api/v1/users/register`, {
      username: this.usernameControl.value,
      password: this.passwordControl.value
    }).toPromise().then(result => {
      console.log(result);
      if (result['ok'] === true) {
        localStorage.setItem('token', Math.random().toString())
        this.router.navigateByUrl(`/users/${result['data']._id}/${result['data'].username}`);
        this.registererr = false;
      } else {
        this.registererr = true;
      }
    });
  }
}
