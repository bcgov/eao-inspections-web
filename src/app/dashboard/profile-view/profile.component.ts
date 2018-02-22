import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  title = "Profile";
  subTitle = "Administrator";
  profile = {
    name: "Mittie Bensen",
    team: "Team 1",
    email: "someone@email.com",
    image: "../../../assets/inspector-profile@4x.png",
    isAdmin: false,
  }

  constructor() { }

  ngOnInit() {
  }

}
