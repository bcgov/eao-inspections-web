import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalService } from './../../services/modal.service';
import * as Parsevar from '../../constants/parse';
import { AuthService } from '../../services/auth.service';
import * as Route from '../../constants/routes';


@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [AuthService]
})
export class MenuComponent {

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
