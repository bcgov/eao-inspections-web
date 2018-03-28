import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import * as Route from '../../constants/routes';
import { ModalService } from '../../services/modal.service';
import * as String from '../../constants/strings';
import { ToastrService } from 'ngx-toastr';
import { BasicUser } from '../../models/user.model';
import { parseUserToModel } from '../../services/parse.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
   user: BasicUser;

  forgotPasswordModal = {
    message: String.FORGOT_PASSWORD_MESSAGE,
    userButton: String.SEND_BUTTON,
  };

  constructor(private authService: AuthService, private router: Router, private modalService: ModalService, private toast: ToastrService) { }

  ngOnInit() {
  }

  open(modal) {
    this.modalService.open(modal, {backdrop: 'static', keyboard: false });
  }

  onSendEmail(email) {
    this.authService.sendResetPassword(email).then(() => {
        this.toast.success('A password reset email was sent successfully');
    }, (error) => {
        this.toast.error(error.message || String.GENERAL_ERROR);
    });
   }

  isAdmin() {
    return (this.authService.isAdmin() || this.authService.isSuperAdmin());
  }

  onLogin(form: NgForm) {
    const username = form.value.email;
    const password = form.value.password;
    this.authService.logIn(username, password).then((results) => {
      this.user = parseUserToModel(results);
      if (this.user.hasLoggedIn) {
        this.router.navigate([Route.HOME(this.isAdmin())]);
      } else {
        this.router.navigate([Route.LOGIN + Route.CHANGE]);
      }
    });
  }
}
