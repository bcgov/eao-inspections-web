import {Component, Input, OnInit} from '@angular/core';

import {ReportService} from '../../../../../services/report.service';
import {Team} from '../../../../../models/team.model';
import * as String from '../../../../../constants/strings';

@Component({
  selector: 'my-report-list',
  templateUrl: './my-report-list.component.html',
  styleUrls: ['./my-report-list.component.scss'],
  providers: [ReportService]
})

export class MyReportListComponent implements OnInit {
  emptyContent = {
    image: "../../assets/inspections.png",
    message: String.EMPTY_INSPECTIONS,
  };
  @Input('data') data: any;
  @Input('page') page: number;
  @Input('totalPages') totalPages: number;
  title = 'Team 1';
  link = '/team-reports';
  reports = [];
  team: Team;
  fields: Array<any>;
  actions: Array<any>;
  isDesc: Boolean = false;
  direction: number;
  column: string;

  constructor(private reportService:ReportService) {
    this.fields = ['title', 'project', 'submitted', 'team', 'actions'];
    this.actions = ['download'];
  }

  ngOnInit() { }

  sort(property: string) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  onChangePage(value) {
    this.page = value;
    this.reportService.getMyReports(value)
      .then((results) => {
        this.data = (results instanceof Array) ? results : [results];
      });
  }
}

