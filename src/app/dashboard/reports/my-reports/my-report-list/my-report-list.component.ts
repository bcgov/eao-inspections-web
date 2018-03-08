import { Component, OnInit } from '@angular/core';

import {ReportService} from '../../../../../services/report.service';
import {parseToJSON} from '../../../../../services/parse.service';
import {Team} from '../../../../../models/team.model';
import {Inspection} from '../../../../../models/inspection.model';
import * as String from '../../../../../constants/strings';


@Component({
  selector: 'my-report-list',
  templateUrl: './my-report-list.component.html',
  styleUrls: ['./my-report-list.component.scss'],
  providers: [ReportService]
})

export class MyReportListComponent implements OnInit {
  title = 'Team 1';
  link = '/team-reports';
  emptyContent = {
    image: "../../assets/inspections.png",
    message: String.EMPTY_INSPECTIONS,
  };

  reports = [];
  data = [];

  constructor(private reportService: ReportService) {
  }

  ngOnInit() {
    this.reportService.getMyReports()
      .then((results) => {
        if (results instanceof Array) {
          this.reports = parseToJSON(results);
          console.log(results);
          this.reports.forEach((obj) => {
            this.data.push(new Inspection(obj.title, obj.subtitle, obj.id, null, obj.project, obj.end, null, null,null, null, obj.submitted));
          });
        }
      });
  }
}

