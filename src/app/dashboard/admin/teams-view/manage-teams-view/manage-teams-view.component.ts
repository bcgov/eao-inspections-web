import { Component, OnInit } from '@angular/core';
import * as String from '../../../../../constants/strings';
import { ModalService } from './../../../../../services/modal.service';

@Component({
  selector: 'app-manage-teams-view',
  templateUrl: './manage-teams-view.component.html',
  styleUrls: ['./manage-teams-view.component.scss']
})
export class ManageTeamsViewComponent implements OnInit {
  title = "Users";
  link = "/admin/team-details";
  users = [
    {
      name: "Lou Ballard",
      image: "../../assets/admin-2@4x.png"
    },
    {
      name: "Janet Thorton",
      image: "../../assets/admin-1@4x.png"
    }
  ]

  modal = {
    header: String.CREATE_USER
  };

  constructor(private modalService: ModalService) { }

  open(modal) {
    this.modalService.open(modal);
  }

  ngOnInit() {
  }

}
