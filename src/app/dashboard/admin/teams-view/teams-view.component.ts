import { Component, OnInit } from '@angular/core';
import { ModalService } from './../../../../services/modal.service';
import * as String from '../../../../constants/strings';
import * as Route from '../../../../constants/routes';

@Component({
  selector: 'app-teams-view',
  templateUrl: './teams-view.component.html',
  styleUrls: ['./teams-view.component.scss']
})
export class TeamsViewComponent implements OnInit {
  title = "Teams";
  archivedLink = Route.ARCHIVED_TEAMS;
  teams = [
    {
      id: 1,
      name: "Team 1",
      image: "../../assets/admin-2@4x.png",
      members: 9
    },
    {
      id: 2,
      name: "Team 2",
      image: "../../assets/admin-1@4x.png",
      members: 55
    },
    {
      id: 3,
      name: "Team 3",
      image: "../../assets/inspector-profile-photo@4x.png",
      members: 2
    },
    {
      id: 4,
      name: "Team 4",
      image: "../../assets/admin-1@4x.png",
      members: 19
    },
    {
      id: 4,
      name: "Team 5",
      image: "../../assets/inspector-profile-photo@4x.png",
      members: 106
    }
  ];

  modal = {
    header: String.CREATE_TEAM
  };

  constructor(private modalService: ModalService) { }

  open(modal) {
    this.modalService.open(modal);
  }

  ngOnInit() {
  }

}
