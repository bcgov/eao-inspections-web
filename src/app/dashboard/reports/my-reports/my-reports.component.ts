import {Component, OnDestroy, OnInit} from '@angular/core';

import {ReportService} from '../../../../services/report.service';
import {parseToJSON} from '../../../../services/parse.service';

@Component({
  selector: 'my-reports',
  templateUrl: './my-reports.component.html',
  styleUrls: ['./my-reports.component.scss'],
  providers: [ReportService]
})
export class MyReportsComponent implements OnInit, OnDestroy {
  title: 'My Reports';
  reports: any = [];
  teams: any = [];

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.reportService.getMyReports()
      .then((results) => {
        if (results instanceof Array) {
          this.reports = parseToJSON(results);
        }
      });
  }

  // this.reports is an array of the Reports

  ngOnDestroy() {
  }
}
