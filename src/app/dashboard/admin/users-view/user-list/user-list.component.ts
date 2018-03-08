import { Component, OnInit } from '@angular/core';

import { AdminService } from './../../../../../services/admin.service';
import { ModalService } from './../../../../../services/modal.service';
import * as String from '../../../../../constants/strings';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [ AdminService ]
})
export class UserListComponent implements OnInit {
  title = "Users";

  modal = {
    header: String.CREATE_USER
  };

  users = [
    {
      name: "Lou Ballard",
      team: "Team 2",
      email: "lou@gmail.com",
      permissions: "Inspector",
      image: "../../assets/admin-2@4x.png"
    },
    {
      name: "Janet Thorton",
      team: "Team 1",
      email: "thorton25@gmail.com",
      permissions: "Inspector",
      image: "../../assets/admin-1@4x.png"
    },
    {
      name: "Lydia Baxter",
      team: "Team 1",
      email: "l_baxter@gmail.com",
      permissions: "Superadmin",
      image: "../../assets/inspector-profile@4x.png"
    },
    {
      name: "Janet Thorton",
      team: "Team 1",
      email: "jt@gmail.com",
      permissions: "Inspector",
      image: "../../assets/admin-1@4x.png"
    },
    {
      name: "Susan Pike",
      team: "Team 1",
      email: "pike_place@gmail.com",
      permissions: "Inspector",
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
