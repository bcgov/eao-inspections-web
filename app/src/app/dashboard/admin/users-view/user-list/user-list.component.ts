import { CHANGE_PASSWORD } from './../../../../../constants/strings';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { AdminService } from './../../../../../services/admin.service';
import { ModalService } from './../../../../../services/modal.service';
import { parseToJSON } from './../../../../../services/parse.service';
import * as String from '../../../../../constants/strings';
import * as Route from '../../../../../constants/routes';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [ AdminService ]
})
export class UserListComponent implements OnInit {
  title = 'Users';
  archivedLink = '/' + Route.DASHBOARD + '/' + Route.ARCHIVED_USERS;
  users = [];

  modal = {
    edit: false,
    message: String.CHANGE_PASSWORD,
    header: String.CREATE_USER,
    userButton: String.ADD_BUTTON,
  };

  editModal = {
    edit: true,
    message: String.ARCHIVE_USER,
    secondaryMessage: String.UNARCHIVE_USER,
    header: String.EDIT_USER,
    userButton: String.EDIT_BUTTON,
    confirmationYes: String.ARCHIVE_BUTTON,
    secondaryYes: String.UNARCHIVE_BUTTON,
    confirmationNo: String.CANCEL_BUTTON,
  };

  emptyContent = {
    image: '../../assets/team-member.png',
    message: String.EMPTY_USER,
  };


  constructor(
    private modalService: ModalService,
    private adminService: AdminService,
    private toast: ToastrService
  ) { }

  openLg(modal) {
    this.modalService.open(modal, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  open(modal) {
    this.modalService.open(modal, { backdrop: 'static', keyboard: false });
  }

  onEdit(value) {
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

  onArchive(value) {
    this.adminService.archiveUser(value).then((object) => {
      this.toast.success('Successfully archived ' + object.get('firstName') + ' ' + object.get('lastName'));
    }, (error) => {
      this.toast.error(error.message || String.GENERAL_ERROR);
    });
  }

  onSubmit(value) {
    this.adminService.createUser(
      value.firstName,
      value.lastName,
      value.email,
      value.password,
      value.team,
      value.permission
    )
      .then((results) => {
        if (results) {
          this.toast.success('Successfully added ' + value.firstName + ' ' + value.lastName);
        }
      }, (error) => {
        this.toast.error(error.message || String.GENERAL_ERROR);
      });
  }

  onPasswordChange(value) {
    this.adminService.updatePassword(value.id, value.password).then((results) => {
      if (results) {
        this.toast.success('Successfully Updated Password');
      }
    }, (error) => {
      this.toast.error(error.message || String.GENERAL_ERROR);
    });
  }

  ngOnInit() {
    this.adminService.getActiveUsers()
    .then((results) => {
      if (results instanceof Array) {
        this.users = parseToJSON(results);
      }
    });
  }

}
