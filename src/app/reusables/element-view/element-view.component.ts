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
  title = 'Element 1';
  subTitle = 'Attached Media';
  link = '/inspection-details';
  routeParam;
  data;
  media;
  mediaSelected;
  isAll;
  isPhotos;
  isVideo;
  isVoice;
  constructor(private route: ActivatedRoute, private reportService: ReportService) {
    this.route.params.subscribe(params => this.routeParam = params);
  }

  ngOnInit() {
    this.reportService.getObservation(this.routeParam.id).then(object => {
      this.data = object;
    });
    this.reportService.getPhotos(this.routeParam.id).then(object => {
      this.media = object;
      this.getMediaAll();
    });
  }

  setInActive() {
    this.isAll = false;
    this.isPhotos = false;
    this.isVideo = false;
    this.isVoice = false;
  }

  getMediaAll() {
    const tempList = [{}];
    this.setInActive();
    this.isAll = true;
    this.media.forEach((object) => {
      tempList.push(object);
    });
    this.mediaSelected = tempList;

  }

  getPhotos() {
    const tempList = [{}];
    this.setInActive();
    this.isPhotos = true;
    this.media.forEach((object) => {
      if (object.type === 'img') {
        tempList.push(object);
      }
    });
    this.mediaSelected = tempList;
  }
  getVideo() {
    const tempList = [{}];
    this.setInActive();
    this.isVideo = true;
    this.media.forEach((object) => {
      if (object.type === 'vid') {
        tempList.push(object);
      }
    });
    this.mediaSelected = tempList;
  }
  getVoice() {
    const tempList = [{}];
    this.setInActive();
    this.isVoice = true;
    this.media.forEach((object) => {
      if (object.type === 'aud') {
        tempList.push(object);
      }
    });
    this.mediaSelected = tempList;  }

}
