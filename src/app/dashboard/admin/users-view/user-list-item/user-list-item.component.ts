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
  @Input('data') data: any;

  modal = {
    message: String.ARCHIVE_USER,
    secondaryMessage: String.UNARCHIVE_USER,
    header: String.EDIT_USER,
    userButton: String.EDIT_BUTTON,
    conformationYes: String.ARCHIVE_BUTTON,
    secondaryYes: String.UNARCHIVE_BUTTON,
    conformationNo: String.CANCEL_BUTTON,
  };

  constructor(private modalService: ModalService, private adminService: AdminService, private toast: ToastrService ) { }

  open(modal) {
    this.modalService.open(modal);
  }

  onSubmit(value) {
    // edit user here
    console.log(value.id, value.firstName, value.lastName, value.email, value.password, value.team, value.permission);
    // this.adminService.updateUser();
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
