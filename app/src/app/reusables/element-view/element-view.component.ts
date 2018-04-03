import {ActivatedRoute} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from '../../../environments/environment';

import {ReportService} from '../../../services/report.service';

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
  media = [];
  photos = [{}];
  audio = [{}];
  videos = [{}];
  mediaSelected;
  isAll;
  isPhotos;
  isVideo;
  isVoice;
<<<<<<< HEAD
  googleStaticMapApiKey: string;
  coordination: string;
=======
  viewOnly;
>>>>>>> bec7743f9952de394511cfdf52f523fdba3f8e56
  constructor(private route: ActivatedRoute, private reportService: ReportService, private location: Location) {
    this.route.params.subscribe(params => this.routeParam = params);
    this.googleStaticMapApiKey = environment.googleStaticMapApiKey;
  }

  ngOnInit() {
    this.reportService.getObservation(this.routeParam.id).then(object => {
      this.data = object;
<<<<<<< HEAD
      this.coordination = this.data.coordinate['_latitude'] + ', ' + this.data.coordinate['_longitude'];
=======
      this.viewOnly = object.viewOnly;
>>>>>>> bec7743f9952de394511cfdf52f523fdba3f8e56
    });
    this.reportService.getMedia(this.routeParam.id, 'Photo').then(object => {
      object.forEach(obj => {
        this.photos.push(obj);
        this.media.push(obj);
      });
    });
    this.reportService.getMedia(this.routeParam.id, 'Video').then(object => {
      object.forEach(obj => {
        this.videos.push(obj);
        this.media.push(obj);
      });
    });
    this.reportService.getMedia(this.routeParam.id, 'Audio').then(object => {
      object.forEach(obj => {
        this.audio.push(obj);
        this.media.push(obj);
      });
    });
    this.getMediaAll();
  }

  onLocationChange() {
    this.location.back();
  }

  setInActive() {
    this.isAll = false;
    this.isPhotos = false;
    this.isVideo = false;
    this.isVoice = false;
  }

  getMediaAll() {
    this.setInActive();
    this.isAll = true;
    this.mediaSelected = this.media;
  }

  getPhotos() {
    this.setInActive();
    this.isPhotos = true;
    this.mediaSelected = this.photos;
  }

  getVideo() {
    this.setInActive();
    this.isVideo = true;
    this.mediaSelected = this.videos;
  }

  getVoice() {
    this.setInActive();
    this.isVoice = true;
    this.mediaSelected = this.audio;
  }
}
