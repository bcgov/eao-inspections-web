import { Component, OnInit } from '@angular/core';
import * as Route from '../../../constants/routes';

@Component({
  selector: 'team-reports',
  templateUrl: './team-reports.component.html',
  styleUrls: ['./team-reports.component.scss']
})
export class TeamReportsComponent implements OnInit {
  title = "Team Reports";
  link = "team-id";

  constructor() { }

  ngOnInit() {
  }

}
