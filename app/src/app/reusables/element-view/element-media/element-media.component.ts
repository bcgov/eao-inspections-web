import { Component, Input, OnInit } from '@angular/core';
import { ReportService } from '../../../../services/report.service';

@Component({
  selector: 'app-element-media',
  templateUrl: './element-media.component.html',
  styleUrls: ['./element-media.component.scss']
})
export class ElementMediaComponent implements OnInit {
  @Input('item') item: any;
  @Input('viewOnly') viewOnly: boolean;
  @Input()
  set totalPages(viewOnly: boolean) {
    this._viewOnly = viewOnly;
  }
  defaultPic = '../../assets/placeholder-image.jpg';
  thumbnailImage = '../../assets/placeholder-image.jpg';
  audioImage = '../../assets/placeholder-voice.jpg';
  videoImage = '../../assets/placeholder-video.png';
  _viewOnly = false;
  type;
  url;

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.thumbnailImage = this.item.fileURL;
    this.url = (this._viewOnly) ? '' : this.item.fileURL;
  }

  setDefaultPic(type?) {
    if (type === 'video') {
      this.thumbnailImage = this.videoImage;
    } else if (type === 'audio') {
      this.thumbnailImage = this.audioImage;
    } else {
      this.thumbnailImage = this.defaultPic;
    }
  }

  downloadFile() {
    let fileExtension;
    switch (this.item.type) {
      case 'Video':
        fileExtension = 'mkv';
        break;
      case 'Audio':
        fileExtension = 'm4a';
        break;
      case 'Photo':
        fileExtension = 'jpg';
        break;
      default:
        fileExtension = 'bin';
    }

    this.reportService.downloadFile(this.item.fileURL, this.item.fileName, fileExtension).catch((error) => {
      console.log(error);
    });
  }
}
