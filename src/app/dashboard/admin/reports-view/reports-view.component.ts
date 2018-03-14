import * as String from './../../../../constants/strings';
import { Component, OnInit } from '@angular/core';
import * as Route from './../../../../constants/routes';
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
  archivedLink = Route.ARCHIVED_INSPECTIONS;

  emptyContent = {
    image: '../../assets/inspections.png',
    message: String.EMPTY_INSPECTIONS,
  };

  teams: Array<Team>;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getActiveTeams()
      .then((results) => {
        if (results instanceof Array) {
          this.teams = results;
        } else {
          this.teams = [results];
        }
      });
  }


}
