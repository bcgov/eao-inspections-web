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
  profile: BasicUser;
  teams;
  admin = [];

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    const userData = this.profileService.user;
    this.profile = new BasicUser(
      userData.objectId,
      userData.get('firstName') + ' ' + userData.get('lastName'),
      this.teams, userData.get('publicEmail'),
      '../../../assets/inspector-profile@4x.png',
      false
    );

    this.profileService.getTeams().then((results) => {
      this.teams = results;
      this.profile.teams = this.teams;
    });

    this.profileService.getTeamAdminInfo()
      .then((teamAdminInfo) => {
        if (teamAdminInfo instanceof Array) {
          teamAdminInfo.forEach((object) => {
            const admin = object.admin;
            const team = object.team;
            this.admin.push(
              new BasicUser(
                userData.objectId,
                admin.get('firstName') + ' ' + admin.get('lastName'),
                team,
                admin.get('publicEmail'),
                '../../../assets/inspector-profile@4x.png',
                true
              )
            );
          });
        }
    });
  }

}
