import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [AuthService]
})
export class MenuComponent {

  constructor(private authService: AuthService, private modalService: NgbModal ) { }

  open(content) {
    this.modalService.open(content);
  }
  
  onLogOut() {
    this.authService.logOut();
  }
}
