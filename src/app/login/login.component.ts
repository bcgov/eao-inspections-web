import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import * as Route from '../../constants/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    const username = form.value.email;
    const password = form.value.password;
    this.authService.logIn(username, password).then((results) => {
      if (results) {
        this.router.navigate([Route.DASHBOARD + '/' + Route.MY_REPORTS);
      }
    });
  }
}
