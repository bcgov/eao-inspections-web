import {Component, OnInit} from '@angular/core';

import {ReportService} from '../../../../services/report.service';
import {Inspection} from '../../../../models/inspection.model';

@Component({
  selector: 'my-reports',
  templateUrl: './my-reports.component.html',
  styleUrls: ['./my-reports.component.scss'],
  providers: [ReportService]
})
export class MyReportsComponent implements OnInit {
  title = 'My Inspections';
  data: Array<Inspection>;

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.reportService.getMyReports()
      .then((results) => {
        this.data = (results instanceof Array) ? results : [results];
      });
  }
}
