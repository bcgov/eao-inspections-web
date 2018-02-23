import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teams-view',
  templateUrl: './teams-view.component.html',
  styleUrls: ['./teams-view.component.scss']
})
export class TeamsViewComponent implements OnInit {
  title = "Teams";
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
    {
      id: 4,
      name: "Team 4",
      image: "../../assets/admin-1@4x.png",
      members: 19
    },
    {
      id: 4,
      name: "Team 5",
      image: "../../assets/inspector-profile@4x.png",
      members: 106
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
