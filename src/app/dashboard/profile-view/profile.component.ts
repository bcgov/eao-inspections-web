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
    team: "Team 1; Team2",
    email: "someone@email.com",
    image: "../../../assets/inspector-profile@4x.png",
    isAdmin: false,
  }

  admin = [
    {
      id: 1,
      name: "Clara Logan",
      team: "Team 2",
      email: "clara12@email.com",
      image: "../../assets/admin-2@4x.png",
      isAdmin: true
    },
    {
      id: 2,
      name: "Agusta Lyons",
      team: "Team 1",
      email: "agusta_lyons@email.com",
      image: "../../assets/admin-1@4x.png",
      isAdmin: true
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
