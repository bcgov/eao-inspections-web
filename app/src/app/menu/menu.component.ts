import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../services/auth.service';
import { BasicUser } from '../../models/user.model';
import { ModalService } from './../../services/modal.service';
import { ProfileService } from '../../services/profile.service';
import { parseUserToModel } from '../../services/parse.service';
import * as Route from '../../constants/routes';
import * as String from '../../constants/strings';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [AuthService, NgbActiveModal, ProfileService]
})
export class MenuComponent implements OnInit{
  modal = {
    message: String.LOGOUT_USER,
    confirmationYes: String.LOGOUT_BUTTON,
    confirmationNo: String.CANCEL_BUTTON
  };
  myInspections = Route.MY_REPORTS;
  teamInspections = Route.TEAM_REPORTS;
  profile = Route.PROFILE;
  settings = Route.SETTINGS;
  adminUser = Route.ADMIN_USERS;
  adminTeam = Route.ADMIN_TEAMS;
  adminReport = Route.ADMIN_REPORTS;
  user: BasicUser;

  constructor(private authService: AuthService,
              public modalService: ModalService,
              private router: Router,
              private profileService: ProfileService) {
  }

  open(content) {
    this.modalService.open(content, { backdrop: 'static', keyboard: false });
  }

  isAuth() {
    return this.authService.isAuthenticated() && this.user;
  }

  onLogOut() {
    this.authService.logOut().then(() => {
      this.router.navigate([Route.LOGIN]);
    });
  }

  isAdmin() {
    return (this.authService.isAdmin() || this.authService.isSuperAdmin());
  }

  setDefaultPic() {
    this.user.profileImage = '../../assets/avatar.png';
  }

  ngOnInit() {
      const userData = this.profileService.user;
      this.user = parseUserToModel(userData);
  }
}
