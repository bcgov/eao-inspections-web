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
    confirmationYes: String.LOGOUT_BUTTON,
    confirmationNo: String.CANCEL_BUTTON
  };

  constructor(private authService: AuthService, public modalService: ModalService, private router: Router ) { }
  myInspections = Route.MY_REPORTS;
  teamInspections = Route.TEAM_REPORTS;
  profile = Route.PROFILE;
  settings = Route.SETTINGS;
  search = Route.SEARCH;
  adminUser = Route.ADMIN_USERS;
  adminTeam = Route.ADMIN_TEAMS;
  adminReport = Route.ADMIN_REPORTS;

  open(content) {
    this.modalService.open(content, { backdrop: 'static', keyboard: false });
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
