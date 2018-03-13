import {Component, Input, OnInit} from '@angular/core';

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
  @Input('data') data: any;
  title = 'Team 1';
  link = '/team-reports';
  emptyContent = {
    image: "../../assets/inspections.png",
    message: String.EMPTY_INSPECTIONS,
  };

  reports = [];


  constructor() {
  }

  ngOnInit() {

  }
}

