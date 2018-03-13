import { Component, OnInit } from '@angular/core';

import {ProfileService} from '../../../../services/profile.service';
import {parseToJSON} from '../../../../services/parse.service';
import * as Route from '../../../../constants/routes';
import { Team } from '../../../../models/team.model';

@Component({
  selector: 'team-reports',
  templateUrl: './team-reports.component.html',
  styleUrls: ['./team-reports.component.scss'],
  providers: [ProfileService]
})
export class TeamReportsComponent implements OnInit {
  title = 'Team Reports';
  teams: Array<Team>;
 

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getTeams()
      .then((results) => {
        if (results instanceof Array) {
          this.teams = results;
        } else {
          this.teams = [results];
        }
      });
  }

}
