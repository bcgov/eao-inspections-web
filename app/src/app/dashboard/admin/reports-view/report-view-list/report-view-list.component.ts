import { Component, OnInit } from '@angular/core';
import { Inspection } from '../../../../../models/inspection.model';
import { Team } from '../../../../../models/team.model';
import { ReportService } from '../../../../../services/report.service';
import { TeamService } from '../../../../../services/team.service';
import { ActivatedRoute } from '@angular/router';
import * as String from '../../../../../constants/strings';
import { Location } from '@angular/common';

@Component({
  selector: 'report-view-list',
  templateUrl: './report-view-list.component.html',
  styleUrls: ['./report-view-list.component.scss'],
  providers: [ReportService, TeamService]
})
export class ReportViewListComponent implements OnInit {
  title = '';

  emptyContent = {
    image: '../../assets/inspections.png',
    message: String.EMPTY_INSPECTIONS,
  };

  isDesc: Boolean = false;
  direction: number;
  column: string;

  teamId: string;
  team: Team;
  data: Array<Inspection> = undefined;
  fields: Array<any>;
  actions: Array<any>;

  page = 0;
  totalPages = 0;

  constructor(private reportService: ReportService, private teamService: TeamService, private route: ActivatedRoute, private location: Location) {
    this.fields = ['title', 'project', 'submitted', 'inspector', 'view', 'actions'];
    this.actions = ['download', 'archive'];
    this.teamId = this.route.snapshot.params['id'];
  }

  refresh() {
    this.sort('updatedAt');
    this.teamService.getTeam(this.teamId).then((team) => {
      this.team = team;
      this.reportService.getActiveTeamReports(this.teamId)
        .then((results) => {
          this.data = results;
          this.totalPages = this.reportService.totalPages;
        });
    });
  }
  
  ngOnInit() {
   this.refresh();
  }

  onLocationChange() {
    this.location.back();
  }

  setDefaultPic() {
    this.team.badge = '../../../assets/team-lg.png';
  }

  sort(property: string) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  onChangePage(value) {
    this.page = value;
    this.reportService.getActiveTeamReports(this.teamId, value)
      .then((results) => {
          this.data = results;
      });
  }
}
