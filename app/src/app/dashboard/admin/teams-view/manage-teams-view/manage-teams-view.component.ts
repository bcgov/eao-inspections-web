import { ADD_MEMBER } from './../../../../../constants/strings';
import { Component, OnInit } from '@angular/core';
import * as String from '../../../../../constants/strings';
import * as Route from '../../../../../constants/routes';
import { ModalService } from './../../../../../services/modal.service';
import { TeamService } from '../../../../../services/team.service';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../../../../../models/team.model';
import { AdminService } from '../../../../../services/admin.service';
import { BasicUser } from '../../../../../models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'manage-teams-view',
  templateUrl: './manage-teams-view.component.html',
  styleUrls: ['./manage-teams-view.component.scss'],
  providers: [TeamService, AdminService]
})
export class ManageTeamsViewComponent implements OnInit {
  title = 'Users';
  link = '/' + Route.DASHBOARD + '/' + Route.ADMIN_TEAMS;
  emptyContent = {
    image: '../../assets/team-lg.png',
    message: String.EMPTY_TEAM_MEMBER,
  };

  team: Team;

  memebers: Array<BasicUser> = [];

  modal = {
    header: String.ADD_MEMBER,
    userButton: String.ADD_MEMBER_BUTTON,
    users: []
  };

  constructor(
    private modalService: ModalService, 
    private teamService: TeamService, 
    private adminService: AdminService, 
    private route: ActivatedRoute,
    private toast: ToastrService
  ) { }

  open(modal) {
    this.modalService.open(modal, { backdrop: 'static', keyboard: false });
  }

  onAddMember(selectedUsers) {
    this.adminService.addUsersToTeam(this.team.id, selectedUsers).then((team) => {
      this.adminService.getTeamMemebers(this.team.id).then((memebers) => {
        this.memebers = memebers;
        this.adminService.getUsersByRole('inspector').then((users) => {
          this.modal.users = users.filter(o1 => !this.memebers.some(o2 => o1.id === o2.id));
        });
      });
    });
  }

  onEditMember(value) {
    this.adminService.updateUser(
      value.id,
      value.firstName,
      value.lastName,
      value.email,
      value.permission)
      .then((object) => {
        this.toast.success('Successfully updated ' + object.get('firstName') + ' ' + object.get('lastName'));
      }, (error) => {
        this.toast.error(error.message || String.GENERAL_ERROR);
      });
   }

  onRemoveMember(user) {
    this.adminService.removeMemberFromTeam(this.team.id, user.id).then(() => {
      this.adminService.getTeamMemebers(this.team.id).then((memebers) => {
        this.memebers = memebers;
        this.adminService.getUsersByRole('inspector').then((users) => {
          this.modal.users = users.filter(o1 => !this.memebers.some(o2 => o1.id === o2.id));
        });
      });
    });
  }

  ngOnInit() {
    const teamId = this.route.snapshot.params['id'];
    this.teamService.getTeam(teamId).then((team) => {
      this.team = team;
    });
    this.adminService.getTeamMemebers(teamId).then((memebers) => {
      this.memebers = memebers;
      this.adminService.getUsersByRole('inspector').then((users) => {
        this.modal.users = users.filter(o1 => !this.memebers.some(o2 => o1.id === o2.id));
      });
    });

  }

}
