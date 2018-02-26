import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-report-list',
  templateUrl: './my-report-list.component.html',
  styleUrls: ['./my-report-list.component.scss']
})
export class MyReportListComponent implements OnInit {
  title = "Team 1";
  link = "/team-reports"

  data = [
    {
      id: 1,
      inspection: "Inspection",
      linkedProject: "57463 Marshall Rd Extension",
      team: "Team 2",
      image: "../../assets/team-logo.png",
      submitted: "Feb 6 2018",
    },
    {
      id: 2,
      inspection: "Inspection",
      linkedProject: "Ajax Mine",
      team: "Team 3",
      image: "../../assets/team-logo.png",
      submitted: "Feb 6 2018",
    },
    {
      id: 3,
      inspection: "Inspection",
      linkedProject: "Air Liquide Liquid Nitrogen Plant",
      team: "Team 3",
      image: "../../assets/team-logo.png",
      submitted: "Feb 6 2018",
    },
    {
      id: 4,
      inspection: "Inspection",
      linkedProject: "57463 Marshall Rd Extension",
      team: "Team 1",
      image: "../../assets/team-logo.png",
      submitted: "Feb 6 2018",
    },
    {
      id: 5,
      inspection: "Inspection",
      linkedProject: "Ajax Mine",
      team: "Team 1",
      image: "../../assets/team-logo.png",
      submitted: "Oct 10 2017",
    },
    {
      id: 6,
      inspection: "Inspection",
      linkedProject: "57463 Marshall Rd Extension",
      team: "Team 2",
      image: "../../assets/team-logo.png",
      submitted: "Jan 6 2018",
    }
    {
      id: 7,
      inspection: "Inspection",
      linkedProject: "57463 Marshall Rd Extension",
      team: "Team 2",
      image: "../../assets/team-logo.png",
      submitted: "Feb 19 2018",
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
