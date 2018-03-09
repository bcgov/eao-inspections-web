import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../../services/modal.service';
import * as String from '../../../../../constants/strings';
import * as Route from '../../../../../constants/routes';

@Component({
  selector: 'app-archived-teams',
  templateUrl: './archived-teams.component.html',
  styleUrls: ['./archived-teams.component.scss']
})
export class ArchivedTeamsComponent implements OnInit {
  title = "Archived Teams";
  teamsLink = Route.ADMIN_TEAMS;
  teams = [];
  
  emptyContent = {
    image: "../../assets/team-lg.png",
    message: String.EMPTY_ARCHIVED_TEAMS,
  };


  constructor() { }

  ngOnInit() {
  }

}
