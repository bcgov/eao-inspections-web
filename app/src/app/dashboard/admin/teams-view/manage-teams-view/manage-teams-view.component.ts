import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { ToastrService } from 'ngx-toastr';

import { AdminService } from '../../../../../services/admin.service';
import { BasicUser } from '../../../../../models/user.model';
import { ModalService } from './../../../../../services/modal.service';
import { TeamService } from '../../../../../services/team.service';
import { Team } from '../../../../../models/team.model';
import * as Route from '../../../../../constants/routes';
import * as String from '../../../../../constants/strings';

@Component({
  selector: 'manage-teams-view',
  templateUrl: './manage-teams-view.component.html',
  styleUrls: ['./manage-teams-view.component.scss'],
  providers: [TeamService, AdminService]
})
export class ManageTeamsViewComponent implements OnInit {
  emptyContent = {
    image: '../../assets/team-lg.png',
    message: String.EMPTY_TEAM_MEMBER,
  };
  modal = {
    header: String.ADD_MEMBER,
    userButton: String.ADD_MEMBER_BUTTON,
    users: []
  };
  title = 'Users';
  link = '/' + Route.DASHBOARD + '/' + Route.ADMIN_TEAMS;
  team: Team;
  members: Array<BasicUser> = undefined;
  page = 0;
  totalPages = 0;

  constructor(private modalService: ModalService,
              private teamService: TeamService,
              private adminService: AdminService,
              private route: ActivatedRoute,
              private toast: ToastrService,
              private location: Location) {
  }

  open(modal) {
    this.modalService.open(modal, { backdrop: 'static', keyboard: false });
  }

  onLocationChange() {
    this.location.back();
  }

  refresh() {
    this.adminService.getTeamMembers(this.team.id).then((members) => {
      this.members = members;
      this.adminService.getUsersByRole('inspector').then((users) => {
        this.modal.users = users.filter(o1 => !this.members.some(o2 => o1.id === o2.id));
      });
    });
  }

  onAddMember(selectedUsers) {
    this.adminService.addUsersToTeam(this.team.id, selectedUsers).then(() => {
      this.refresh();
    });
  }

  onEditMember(value) {
    this.adminService.updateUser(
      value.id,
      value.firstName,
      value.lastName,
      value.email,
      value.permission,
      value.photo)
      .then((object) => {
        this.toast.success('Successfully updated ' + object.get('firstName') + ' ' + object.get('lastName'));
        this.refresh();
      }, (error) => {
        this.toast.error(error.message || String.GENERAL_ERROR);
      });
   }

  onRemoveMember(user) {
    this.adminService.removeMemberFromTeam(this.team.id, user.id).then(() => {
      this.refresh();
    });
  }

  ngOnInit() {
    const teamId = this.route.snapshot.params['id'];
    this.teamService.getTeam(teamId).then((team) => {
      this.team = team;
      this.adminService.getTeamMembers(teamId).then((members) => {
        this.totalPages = this.adminService.totalPages;
        this.members = members;
        this.adminService.getUsersByRole('inspector').then((users) => {
          const activeUsers = users.filter(o1 => !this.members.some(o2 => o1.id === o2.id));
          this.modal.users = activeUsers.filter(o1 => o1.isActive);
        });
      });
    });
  }

  onChangePage(value) {
    this.page = value;
    this.adminService.getTeamMembers(this.team.id, value).then((members) => {
      this.members = members;
      this.adminService.getUsersByRole('inspector').then((users) => {
        this.modal.users = users.filter(o1 => !this.members.some(o2 => o1.id === o2.id));
      });
    });
  }

}
