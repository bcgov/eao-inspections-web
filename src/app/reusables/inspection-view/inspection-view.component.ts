import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReportService} from '../../../services/report.service';

@Component({
  selector: 'inspection-view',
  templateUrl: './inspection-view.component.html',
  styleUrls: ['./inspection-view.component.scss'],
  providers: [ReportService]
})
export class InspectionViewComponent implements OnInit {
  data;
  elements;
  title = 'Inspection';
  subTitle = 'Observation Elements';
  link = '/team-reports/team/id';
  routeParam;
  message: string;

  constructor(private route: ActivatedRoute, private reportService: ReportService) {
    this.route.params.subscribe(params => this.routeParam = params);
  }

  ngOnInit() {
    this.reportService.getInspection(this.routeParam.id).then(object => {
      this.data = object;
    });
    this.reportService.getObservations(this.routeParam.id)
      .then((results) => {
        if (results instanceof Array) {
          this.elements = results;
        } else {
          this.elements = [results];
        }
      });
  }

}
