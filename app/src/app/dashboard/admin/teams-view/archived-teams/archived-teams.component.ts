import { Component, OnInit } from '@angular/core';

import { AdminService } from './../../../../../services/admin.service';
import { Team } from '../../../../../models/team.model';
import * as String from '../../../../../constants/strings';
import * as Route from '../../../../../constants/routes';

@Component({
  selector: 'app-archived-teams',
  templateUrl: './archived-teams.component.html',
  styleUrls: ['./archived-teams.component.scss'],
  providers: [ AdminService ]
})
export class ArchivedTeamsComponent implements OnInit {
  emptyContent = {
    image: "../../assets/team-lg.png",
    message: String.EMPTY_ARCHIVED_TEAMS,
  };
  title = "Archived Teams";
  teamsLink = '/' + Route.DASHBOARD + '/' + Route.ADMIN_TEAMS;
  teams: Array<Team> = [];
  page = 0;
  totalPages = 0;

  constructor(private adminService: AdminService) { }

  refresh() {
    this.adminService.getArchivedTeams()
      .then((results) => {
        this.teams = results;
      });
  }

  ngOnInit() {
    this.adminService.getArchivedTeams()
      .then((results) => {
        this.teams = results;
        this.totalPages = this.adminService.totalPages;
      });
  }

  onChangePage(value) {
    this.page = value;
    this.adminService.getArchivedTeams(value)
      .then((results) => {
          this.teams = results;
       });
  }
}
