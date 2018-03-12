import {Component, OnInit} from '@angular/core';
import {ReportService} from '../../../../services/report.service';

@Component({
  selector: 'my-reports',
  templateUrl: './my-reports.component.html',
  styleUrls: ['./my-reports.component.scss'],
  providers: [ReportService]
})
export class MyReportsComponent implements OnInit {
  title: 'My Reports';
  data = [];

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.reportService.getMyReports()
      .then((results) => {
        if (results instanceof Array) {
          this.data = results;
        }
      });
  }

}
