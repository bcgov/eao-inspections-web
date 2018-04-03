import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../../../services/admin.service';
import * as String from './../../../../constants/strings';
import { Team } from '../../../../models/team.model';

@Component({
  selector: 'app-reports-view',
  templateUrl: './reports-view.component.html',
  styleUrls: ['./reports-view.component.scss'],
  providers: [AdminService]
})
export class ReportsViewComponent implements OnInit {
  title = "Inspections";

  emptyContent = {
    image: '../../assets/inspections.png',
    message: String.EMPTY_INSPECTIONS,
  };

  teams: Array<Team> = undefined;
  page = 0;
  totalPages = 0;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getActiveTeams()
      .then((results) => {
        this.teams = results;
        this.totalPages = this.adminService.totalPages;
      });
  }

  onChangePage(value) {
    this.page = value;
    this.adminService.getActiveTeams(value)
      .then((results) => {
          this.teams = results;
      });
  }


}
