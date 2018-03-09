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
    header: String.EDIT_USER,
    userButton: String.EDIT_BUTTON,
    conformationYes: String.ARCHIVE_BUTTON,
    conformationNo: String.CANCEL_BUTTON,
  };

  constructor(private modalService: ModalService, private adminService: AdminService ) { }

  open(modal) {
    this.modalService.open(modal);
  }

  onSubmit(value) {
    // edit user here
    console.log(value.firstName, value.lastName, value.email, value.password, value.team, value.permission);
  }

  onUnarchive(value) {
    console.log("Unarchived User");
  }

  onArchive(value) {
    this.adminService.archiveUser(value);
  }
  
  ngOnInit() {
  }

}
