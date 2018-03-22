import * as String from './../../../../constants/strings';
import { Component, OnInit } from '@angular/core';
import { Team } from '../../../../models/team.model';
import { AdminService } from '../../../../services/admin.service';

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

  teams: Array<Team>;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getActiveTeams()
      .then((results) => {
        this.teams = (results instanceof Array) ? results : [results];
      });
  }


}
