import { AdminService } from './../../../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../../services/modal.service';
import * as String from '../../../../../constants/strings';
import * as Route from '../../../../../constants/routes';
import { parseToJSON } from '../../../../../services/parse.service';

@Component({
  selector: 'app-archived-teams',
  templateUrl: './archived-teams.component.html',
  styleUrls: ['./archived-teams.component.scss'],
  providers: [ AdminService ]
})
export class ArchivedTeamsComponent implements OnInit {
  title = "Archived Teams";
  teamsLink = Route.ADMIN_TEAMS;
  teams = [];
  
  emptyContent = {
    image: "../../assets/team-lg.png",
    message: String.EMPTY_ARCHIVED_TEAMS,
  };


  constructor(private adminService: AdminService) { }

  ngOnInit() {
  this.adminService.getArchivedTeams()
    .then((results) => {
      if (results instanceof Array) {
        this.teams = parseToJSON(results);
      }
    });
  }
}
