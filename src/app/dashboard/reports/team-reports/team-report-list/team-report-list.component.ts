import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as String from '../../../../../constants/strings';
import {ReportService} from '../../../../../services/report.service';
import { Inspection } from '../../../../../models/inspection.model';
import { Team } from '../../../../../models/team.model';
import { TeamService } from '../../../../../services/team.service';

@Component({
  selector: 'team-report-list',
  templateUrl: './team-report-list.component.html',
  styleUrls: ['./team-report-list.component.scss'],
  providers: [ReportService, TeamService]
})
export class TeamReportListComponent implements OnInit {
  emptyContent = {
    image: '../../assets/team-lg.png',
    message: String.EMPTY_TEAM,
  };

  isDesc = false;
  direction: number;
  column: string;

  team: Team;
  data: Array<Inspection>;

  constructor(private reportService: ReportService, private teamService: TeamService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const teamId = this.route.snapshot.params['id'];
    this.teamService.getTeam(teamId).then((team) => {
      this.team = team;
    });
    this.reportService.getTeamReports(teamId)
      .then((results) => {
        this.data = results;
      });
  }

  setDefaultPic() {
    this.team.image = '../../../assets/team-logo.png';
  }

  sort(property: string) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }
}
