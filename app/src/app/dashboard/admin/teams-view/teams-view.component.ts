import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { AdminService } from './../../../../services/admin.service';
import { ModalService } from './../../../../services/modal.service';
import { Team } from '../../../../models/team.model';
import * as String from '../../../../constants/strings';
import * as Route from '../../../../constants/routes';

@Component({
  selector: 'app-teams-view',
  templateUrl: './teams-view.component.html',
  styleUrls: ['./teams-view.component.scss'],
  providers: [ AdminService ]
})
export class TeamsViewComponent implements OnInit {
  modal = {
    edit: false,
    header: String.CREATE_TEAM
  };
  emptyContent = {
    image: '../../assets/team-lg.png',
    message: String.EMPTY_TEAM,
  };
  title = 'Teams';
  archivedLink = '/' + Route.DASHBOARD + '/' + Route.ARCHIVED_TEAMS;
  teams: Array<Team> = undefined;
  page = 0;
  totalPages = 0;

  constructor(private modalService: ModalService,
              private adminService: AdminService,
              private toast: ToastrService) {
  }

  open(modal) {
    this.modalService.open(modal, { backdrop: 'static', keyboard: false });
  }

  refresh() {
    this.adminService.getActiveTeams()
      .then((results) => {
        this.teams = results;
      });
  }

  onSubmit(value) {
    this.adminService.createTeam(value.teamName, value.color, value.teamAdmin, value.photo).then((object: any) => {
      this.toast.success('Successfully added ' + object.get('name'));
      this.refresh();
    }, (error) => {
      this.toast.error(error.message || String.GENERAL_ERROR);
    });
  }

  ngOnInit() {
    this.adminService.getActiveTeams()
    .then((results) => {
        this.teams = results;
        this.totalPages = this.adminService.totalPages;
    });
  }

  onChangePage(value) {
    this.page = value;
    this.adminService.getActiveTeams(value)
      .then((results) => {
          this.teams = results;
      });
  }
}
