import { AdminService } from './../../../../../services/admin.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from './../../../../../services/modal.service';
import * as String from './../../../../../constants/strings';

@Component({
  selector: 'user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})

export class UserListItemComponent implements OnInit {
  @Input('user') user: any;

  modal = {
    message: String.ARCHIVE_USER,
    secondaryMessage: String.UNARCHIVE_USER,
    header: String.EDIT_USER,
    userButton: String.EDIT_BUTTON,
    conformationYes: String.ARCHIVE_BUTTON,
    secondaryYes: String.UNARCHIVE_BUTTON,
    conformationNo: String.CANCEL_BUTTON,
  };

  constructor(private modalService: ModalService, private adminService: AdminService ) { }

  open(modal) {
    this.modalService.open(modal);
  }

  onSubmit(value) {
    // edit user here
    console.log(value.firstName, value.lastName, value.email, value.password, value.team, value.permission);
    // this.adminService.updateUser();
  }

  onUnarchive(value) {
    console.log("Unarchived User:" + value);
    // this.adminService.unArchiveUser(value);
  }

  onArchive(value) {
    console.log("archived User:" + value);
    // this.adminService.archiveUser(value);
  }
  
  ngOnInit() {
  } 

}
