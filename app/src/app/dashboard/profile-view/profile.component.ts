import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../../services/profile.service';
import {parseUserToModel} from '../../../services/parse.service';
import {BasicUser} from '../../../models/user.model';

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
    this.profile = parseUserToModel(userData);

    this.profileService.getTeams().then((results) => {
      this.teams = results;
      this.profile.teams = this.teams;
    });

    this.profileService.getTeamAdminInfo()
      .then((teamAdminInfo) => {
        if (teamAdminInfo instanceof Array) {
          teamAdminInfo.forEach(teamObject => {
            let duplicate = false;
            const admin = teamObject.admin;
            admin.teams.push(teamObject);
            this.admin.forEach((adminObject) => {
              if (adminObject.id === admin.id) {
                adminObject.teams.push(teamObject);
                duplicate = true;
              }
            });
            if(!duplicate) {
              this.admin.push(admin);
            }
        });

      }
    });
  }

}
