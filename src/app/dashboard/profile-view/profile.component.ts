import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../../services/profile.service';
import {parseToJSON} from '../../../services/parse.service';
import {BasicUser} from '../../../models/user.model';
import {Team} from '../../../models/team.model';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {
  title = "Profile";
  subTitle = "Administrator";
  teamData = [];
  adminData = [];
  profile: BasicUser;
  teams;
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
  ];

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    const userData = parseToJSON([this.profileService.user])[0];
    this.profile = new BasicUser(
      userData.objectId,
      userData.fname + ' ' + userData.lname,
      this.teams, userData.email,
      '../../../assets/inspector-profile@4x.png',
      false
    );

    this.profileService.getTeams().then((results) => {
      this.teams = results;
      this.profile['teams'] = this.teams;
    });

    this.profileService.getTeamAdminInfo()
      .then((teamAdminInfo) => {
      if (teamAdminInfo instanceof Array) {
        this.adminData = parseToJSON(teamAdminInfo);
        this.adminData.forEach((object) => {
          this.admin.push({
            id: 2,
            name: object['fname'] + ' ' + object['lname'],
            team: "",
            email: object['email'],
            image: "../../assets/admin-1@4x.png",
            isAdmin: true
          });
        });
      }
    });
  }

}
