import { Component, OnInit } from '@angular/core';

import {ProfileService} from '../../../../services/profile.service';
import { Team } from '../../../../models/team.model';
import * as String from '../../../../constants/strings';

@Component({
  selector: 'team-reports',
  templateUrl: './team-reports.component.html',
  styleUrls: ['./team-reports.component.scss'],
  providers: [ProfileService]
})
export class TeamReportsComponent implements OnInit {
  title = 'Team Inspections';
  teams: Array<Team> = undefined;
  page = 0;
  totalPages = 0;

  emptyContent = {
    image: '../../assets/team-lg.png',
    message: String.NOT_TEAM_MEMBER,
  };

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getTeams()
      .then((results) => {
        this.teams = (results instanceof Array) ? results : [results];
        this.totalPages = this.profileService.totalPages;
      });
  }
  onChangePage(value) {
    this.page = value;
    this.profileService.getTeams(value)
      .then((results) => {
        this.teams = (results instanceof Array) ? results : [results];
      });
  }
}
