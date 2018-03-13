import { AdminService } from './../../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from './../../../../services/modal.service';
import * as String from '../../../../constants/strings';
import * as Route from '../../../../constants/routes';
import { parseToJSON } from '../../../../services/parse.service';

@Component({
  selector: 'app-teams-view',
  templateUrl: './teams-view.component.html',
  styleUrls: ['./teams-view.component.scss'],
  providers: [ AdminService ]
})
export class TeamsViewComponent implements OnInit {
  title = "Teams";
  archivedLink = Route.ARCHIVED_TEAMS;
  teams = [];

  modal = {
    header: String.CREATE_TEAM
  };

  emptyContent = {
    image: "../../assets/team-lg.png",
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
    this.adminService.createTeam(value.teamName, value.color).then((results) => {
      if (results) {
        this.toast.success('Successfully added a new Team');
      };
    });
  }

  ngOnInit() {
    this.adminService.getActiveTeams()
    .then((results) => {
      if (results instanceof Array) {
        this.teams = parseToJSON(results);
      }
    });
  }
}
