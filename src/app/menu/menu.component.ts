import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalService } from './../../services/modal.service';
import * as Parsevar from '../../constants/parse';
import { AuthService } from '../../services/auth.service';
import * as Route from '../../constants/routes';
import * as String from '../../constants/strings';


@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [AuthService, NgbActiveModal]
})
export class MenuComponent {
  modal = {
    message: String.LOGOUT_USER,
    conformationYes: String.LOGOUT_BUTTON,
    conformationNo: String.CANCEL_BUTTON
  }

  constructor(private authService: AuthService, public modalService: ModalService, private router: Router ) { }

  open(content) {
    this.modalService.open(content);
  }

  isAuth() {
    return this.authService.isAuthenticated();
  }

  onLogOut() {
    this.authService.logOut().then(() => {
      this.router.navigate([Route.LOGIN]);
    });
  }

  isAdmin() {
    return (this.authService.isAdmin() || this.authService.isSuperAdmin());
  }
}
