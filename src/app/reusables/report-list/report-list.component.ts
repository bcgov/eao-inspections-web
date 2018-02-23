import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {
  title = "Team 1";
  link = "/team-reports"

  constructor() { }

  ngOnInit() {
  }

}
