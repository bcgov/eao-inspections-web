import { ADD_MEMBER } from './../../../../../constants/strings';
import { Component, OnInit } from '@angular/core';
import * as String from '../../../../../constants/strings';
import { ModalService } from './../../../../../services/modal.service';

@Component({
  selector: 'manage-teams-view',
  templateUrl: './manage-teams-view.component.html',
  styleUrls: ['./manage-teams-view.component.scss']
})
export class ManageTeamsViewComponent implements OnInit {
  title = "Users";
  link = "/admin/team-details";
  emptyContent = {
    image: "../../assets/team-lg.png",
    message: String.EMPTY_TEAM_MEMBER,
  };

  users = []

  modal = {
    header: String.ADD_MEMBER,
    userButton: String.ADD_MEMBER_BUTTON,
  };

  constructor(private modalService: ModalService) { }

  open(modal) {
    this.modalService.open(modal);
  }

  addMember(value) {
    console.log("Adding User: " + value);
  }

  ngOnInit() {
  }

}
