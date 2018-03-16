import { AdminService } from './../../../../../services/admin.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from './../../../../../services/modal.service';
import * as String from './../../../../../constants/strings';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})

export class UserListItemComponent implements OnInit {
  @Input('user') user: any;

  modal = {
    edit: true,
    message: String.ARCHIVE_USER,
    secondaryMessage: String.UNARCHIVE_USER,
    header: String.EDIT_USER,
    userButton: String.EDIT_BUTTON,
    confirmationYes: String.ARCHIVE_BUTTON,
    secondaryYes: String.UNARCHIVE_BUTTON,
    confirmationNo: String.CANCEL_BUTTON,
  };

  constructor(
    private modalService: ModalService, 
    private adminService: AdminService, 
    private toast: ToastrService 
  ) { }

  openEdit(modal) {
    this.modalService.open(modal, { size: 'lg', backdrop: 'static', keyboard: false })
  }

  open(modal) {
    this.modalService.open(modal, { backdrop: 'static', keyboard: false });
  }

  onSubmit(value) {
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

  onUnarchive(value) {
    this.adminService.unArchiveUser(value).then((object) => {
      this.toast.success('Successfully unarchived ' + object.get('firstName') + ' ' + object.get('lastName'));
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

  ngOnInit() {
  }

}
