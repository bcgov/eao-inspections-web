import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports-view',
  templateUrl: './reports-view.component.html',
  styleUrls: ['./reports-view.component.scss']
})
export class ReportsViewComponent implements OnInit {
  title = "Reports";
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
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
