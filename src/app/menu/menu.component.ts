import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [AuthService]
})
export class MenuComponent implements OnInit {
  public isVisible = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogOut() {
    this.authService.logOut();
  }
}
