import { AdminService } from './../../../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../../services/modal.service';
import * as String from '../../../../../constants/strings';
import * as Route from '../../../../../constants/routes';
import { parseToJSON } from '../../../../../services/parse.service';
import { Team } from '../../../../../models/team.model';

@Component({
  selector: 'app-archived-teams',
  templateUrl: './archived-teams.component.html',
  styleUrls: ['./archived-teams.component.scss'],
  providers: [ AdminService ]
})
export class ArchivedTeamsComponent implements OnInit {
  title = "Archived Teams";
  teamsLink = '/' + Route.DASHBOARD + '/' + Route.ADMIN_TEAMS;
  teams: Array<Team> = undefined;

  emptyContent = {
    image: "../../assets/team-lg.png",
    message: String.EMPTY_ARCHIVED_TEAMS,
  };

  page = 0;
  totalPages = 0;


  constructor(private adminService: AdminService) { }

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
