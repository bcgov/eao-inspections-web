import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
