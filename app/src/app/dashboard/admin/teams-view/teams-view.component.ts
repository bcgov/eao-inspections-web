import { AdminService } from './../../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from './../../../../services/modal.service';
import * as String from '../../../../constants/strings';
import * as Route from '../../../../constants/routes';
import { parseToJSON } from '../../../../services/parse.service';
import { Team } from '../../../../models/team.model';

@Component({
  selector: 'app-teams-view',
  templateUrl: './teams-view.component.html',
  styleUrls: ['./teams-view.component.scss'],
  providers: [ AdminService ]
})
export class TeamsViewComponent implements OnInit {
  title = 'Teams';
  archivedLink = '/' + Route.DASHBOARD + '/' + Route.ARCHIVED_TEAMS;
  teams: Array<Team> = [];

  modal = {
    edit: false,
    header: String.CREATE_TEAM
  };

  emptyContent = {
    image: '../../assets/team-lg.png',
    message: String.EMPTY_TEAM,
  };

  constructor(
    private modalService: ModalService,
    private adminService: AdminService,
    private toast: ToastrService
  ) { }

  open(modal) {
    this.modalService.open(modal, { backdrop: 'static', keyboard: false });
  }

  onSubmit(value) {
    this.adminService.createTeam(value.teamName, value.color, value.photo).then((object) => {
      this.toast.success('Successfully added a new team');
    }, (error) => {
      this.toast.error(error.message || String.GENERAL_ERROR);
    });
  }

  ngOnInit() {
    this.adminService.getActiveTeams()
    .then((results) => {
        this.teams = results;
    });
  }
}
