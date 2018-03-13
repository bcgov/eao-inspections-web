import { Component, OnInit, Input } from '@angular/core';
import * as String from '../../../../../constants/strings';
import {ProfileService} from '../../../../../services/profile.service';
import {ReportService} from '../../../../../services/report.service';

@Component({
  selector: 'team-report-list',
  templateUrl: './team-report-list.component.html',
  styleUrls: ['./team-report-list.component.scss'],
  providers: [ProfileService]
})
export class TeamReportListComponent implements OnInit {
  // @Input('data') data: any;
  emptyContent = {
    image: "../../assets/team-lg.png",
    message: String.EMPTY_TEAM,
  };

  constructor(private reportService: ReportService) { }

  ngOnInit() {
  }

}
