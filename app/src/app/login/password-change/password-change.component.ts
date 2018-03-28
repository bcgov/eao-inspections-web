import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import * as Route from '../../../constants/routes';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
  providers: [AuthService]
})
export class PasswordChangeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  isAdmin() {
    return (this.authService.isAdmin() || this.authService.isSuperAdmin());
  }

  ngOnInit() {
  }

  onPasswordChange(form: NgForm) {
    const password = form.value.password;
    this.authService.firstTimePassword(password).then((results) => {
      this.router.navigate([Route.HOME(this.isAdmin())]);
    });
  }
}
