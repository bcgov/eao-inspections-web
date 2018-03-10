import * as String from './../../../../constants/strings';
import { Component, OnInit } from '@angular/core';
import * as Route from './../../../../constants/routes';

@Component({
  selector: 'app-reports-view',
  templateUrl: './reports-view.component.html',
  styleUrls: ['./reports-view.component.scss']
})
export class ReportsViewComponent implements OnInit {
  title = "Inspections";
  archivedLink = Route.ARCHIVED_INSPECTIONS;

  emptyContent = {
    image: "../../assets/inspections.png",
    message: String.EMPTY_INSPECTIONS,
  };
  teams = []

  constructor() { }

  ngOnInit() {
  }

}
