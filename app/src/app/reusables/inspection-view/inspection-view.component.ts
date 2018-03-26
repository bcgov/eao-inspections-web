import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReportService} from '../../../services/report.service';
import { ProfileService } from '../../../services/profile.service';
import { parseUserToModel } from '../../../services/parse.service';
import { Location } from '@angular/common';

@Component({
  selector: 'inspection-view',
  templateUrl: './inspection-view.component.html',
  styleUrls: ['./inspection-view.component.scss'],
  providers: [ReportService, ProfileService]
})
export class InspectionViewComponent implements OnInit {
  data;
  elements;
  title = 'Inspection';
  subTitle = 'Observation Elements';
  routeParam;
  message: string;

  user: any;

  isDesc:boolean = false;
  direction: number;
  column: string;


  constructor(private route: ActivatedRoute, private reportService: ReportService, private profileService: ProfileService, private location: Location) {
    this.routeParam = this.route.snapshot.params;
  }

  ngOnInit() {
    this.sort('createdAt');
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
    const userData = this.profileService.user;
    this.user = parseUserToModel(userData);
  }

  onLocationChange() {
    this.location.back();
  }

  sort(property: string) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }
}
