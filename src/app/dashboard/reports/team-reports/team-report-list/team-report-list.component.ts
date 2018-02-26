import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'team-report-list',
  templateUrl: './team-report-list.component.html',
  styleUrls: ['./team-report-list.component.scss']
})
export class TeamReportListComponent implements OnInit {
  @Input('data') data: any;

  data = [
    {
      id: 1,
      inspection: "Inspection",
      linkedProject: "57463 Marshall Rd Extension",
      team: "Thomas Thorton",
      image: "../../assets/team-logo.png",
      submitted: "Feb 6 2018",
    },
    {
      id: 2,
      inspection: "Inspection",
      linkedProject: "Ajax Mine",
      team: "Lou Ballard",
      image: "../../assets/team-logo.png",
      submitted: "Feb 6 2018",
    },
    {
      id: 3,
      inspection: "Inspection",
      linkedProject: "Air Liquide Liquid Nitrogen Plant",
      team: "Mark Tucker",
      image: "../../assets/team-logo.png",
      submitted: "Feb 6 2018",
    },
    {
      id: 4,
      inspection: "Inspection",
      linkedProject: "57463 Marshall Rd Extension",
      team: "Lou Ballard",
      image: "../../assets/team-logo.png",
      submitted: "Feb 6 2018",
    },
    {
      id: 5,
      inspection: "Inspection",
      linkedProject: "Ajax Mine",
      team: "Thomas Thorton",
      image: "../../assets/team-logo.png",
      submitted: "Oct 10 2017",
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
