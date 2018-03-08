import { AdminService } from './../../../../services/admin.service';
import { ModalService } from './../../../../services/modal.service';
import { Component, OnInit } from '@angular/core';

import * as String from '../../../../constants/strings';

@Component({
  selector: 'users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss'],
  providers: [ AdminService ]
})
export class UsersViewComponent implements OnInit {
  title = "Users";
  
  modal = {
    header: String.CREATE_USER
  };

  users = [
      {
        name: "Lou Ballard",
        image: "../../assets/admin-2@4x.png"
      },
      {
        name: "Janet Thorton",
        image: "../../assets/admin-1@4x.png"
      },
      {
        name: "Lydia Baxter",
        image: "../../assets/inspector-profile@4x.png"
      }
    ]

  constructor(
    private modalService: ModalService, 
    private adminService: AdminService
  ) { }

  open(modal) {
    this.modalService.open(modal);
  }

  onSubmit(value) {
    this.adminService.createUser(value.firstName, value.lastName, value.email, value.password, value.team, value.permission);
  }

  ngOnInit() {
  }

}
