import { Component, OnInit } from '@angular/core';
import {ReportService} from '../../../services/report.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-element-view',
  templateUrl: './element-view.component.html',
  styleUrls: ['./element-view.component.scss'],
  providers: [ReportService]
})
export class ElementViewComponent implements OnInit {
  title = "Element 1";
  subTitle = "Attached Media";
  link = "/inspection-details";
  routeParam;
  data;
  photos;

  constructor(private route: ActivatedRoute, private reportService: ReportService) {
    this.route.params.subscribe(params => this.routeParam = params);
  }

  ngOnInit() {
    this.reportService.getObservation(this.routeParam.id).then(object => {
      this.data = object;
    });
    this.reportService.getPhotos(this.routeParam.id).then(object => {
      this.photos = object;
    });
  }

}
