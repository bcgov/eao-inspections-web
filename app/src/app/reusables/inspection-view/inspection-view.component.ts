import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReportService} from '../../../services/report.service';
import { ProfileService } from '../../../services/profile.service';
import { parseUserToModel } from '../../../services/parse.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import * as String from '../../../constants/strings';


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

  page = 0;
  totalPages = 0;

  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService,
    private profileService: ProfileService,
    private location: Location,
    private toast: ToastrService
  ) {
    this.routeParam = this.route.snapshot.params;
  }

  ngOnInit() {
    this.sort('createdAt');

    this.reportService.getInspection(this.routeParam.id).then(object => {
      this.data = object;
      this.reportService.getObservations(this.routeParam.id)
      .then((results) => {
        this.elements = results;
        this.totalPages = this.reportService.totalPages;
      }).catch((error) => {
        this.toast.error(error.message || String.GENERAL_ERROR);
      });
    }).catch((error) => {
      this.toast.error(error.message || String.GENERAL_ERROR);
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

  onDownload(report) {
    this.reportService.download(report).then(() => {
      this.toast.success('Successfully downloaded ' + report.title);
    }).catch((error) => {
      this.toast.error(error.message || String.GENERAL_ERROR);
    });
  }
  onChangePage(value) {
    this.page = value;
    this.reportService.getObservations(this.routeParam.id, value)
      .then((results) => {
          this.elements = results;
      });
  }
}
