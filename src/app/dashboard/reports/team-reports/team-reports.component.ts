import { Component, OnInit } from '@angular/core';
import * as Route from '../../../../constants/routes';

@Component({
  selector: 'team-reports',
  templateUrl: './team-reports.component.html',
  styleUrls: ['./team-reports.component.scss']
})
export class TeamReportsComponent implements OnInit {
  title = "Team Reports";
  link = "team/id";
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
      image: "../../assets/inspector-profile@4x.png",
      members: 2
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
