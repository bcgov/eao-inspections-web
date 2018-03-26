import { Component, OnInit } from '@angular/core';

import {ProfileService} from '../../../../services/profile.service';
import { Team } from '../../../../models/team.model';

@Component({
  selector: 'team-reports',
  templateUrl: './team-reports.component.html',
  styleUrls: ['./team-reports.component.scss'],
  providers: [ProfileService]
})
export class TeamReportsComponent implements OnInit {
  title = 'Team Inspections';
  teams: Array<Team>;


  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getTeams()
      .then((results) => {
        this.teams = (results instanceof Array) ? results : [results];
      });
  }

}
