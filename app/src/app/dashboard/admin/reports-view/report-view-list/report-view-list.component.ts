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

  team: Team;
  data: Array<Inspection> = [];
  fields: Array<any>;
  actions: Array<any>;

  constructor(private reportService: ReportService, private teamService: TeamService, private route: ActivatedRoute, private location: Location) {
    this.fields = ['title', 'project', 'submitted', 'inspector', 'view', 'actions'];
    this.actions = ['download', 'archive'];
  }

  ngOnInit() {
    this.sort('updatedAt');
    const teamId = this.route.snapshot.params['id'];
    this.teamService.getTeam(teamId).then((team) => {
      this.team = team;
      console.log(this.team);
    });
    this.reportService.getActiveTeamReports(teamId)
    .then((results) => {
      this.data = results;
    });
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
}
