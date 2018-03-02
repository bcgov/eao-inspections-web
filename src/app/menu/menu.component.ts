import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { ModalService } from './../../services/modal.service';
import * as Parsevar from '../../constants/parse';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [AuthService]
})
export class MenuComponent {

  constructor(private authService: AuthService, public modalService: ModalService ) { }

  open(content) {
    this.modalService.open(content);
  }

  isAuth() {
    return !! this.authService.isAuthenticated();
  }

  onLogOut() {
    this.authService.logOut();
  }
}
