import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../../services/profile.service';
import {parseTeamToModel, parseToJSON, parseUserToModel} from '../../../services/parse.service';
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
  adminIds = [];

  constructor(private profileService: ProfileService) {}

  removeDuplicateUsingSet(arr) {
    let unique_array = Array.from(new Set(arr))
    return unique_array
  }

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
          teamAdminInfo.forEach(object => {
            let duplicate = false;
            const admin = object.admin;
            admin.teams = object.team;
            this.admin.forEach(_obj => {
              if (_obj.id === object.id) {
                duplicate = true;
              }
            });
            if (!duplicate) {
              this.admin.push(admin);
            }
        });
      };
    });
  }

}
