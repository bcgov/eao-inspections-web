import { EMPTY_ARCHIVED_TEAMS } from './../../../../../constants/strings';
import * as String from '../../../../../constants/strings';
import * as Route from '../../../../../constants/routes';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-archived-inspections',
  templateUrl: './archived-inspections.component.html',
  styleUrls: ['./archived-inspections.component.scss']
})
export class ArchivedInspectionsComponent implements OnInit {
  title = "Archived Inspections";
  inspectionsLink = Route.ADMIN_REPORTS;

  emptyContent = {
    image: "../../assets/inspections.png",
    message: String.EMPTY_ARCHIVED_INSPECTIONS,
  };

  teams = []

  constructor() { }

  ngOnInit() {
  }
}
