import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import * as Parsevar from '../../constants/parse';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [AuthService]
})
export class MenuComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  isAuth() {
    return !! this.authService.isAuthenticated();
  }
  onLogOut() {
    this.authService.logOut();
  }
}
