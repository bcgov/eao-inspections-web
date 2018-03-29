import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-element-media',
  templateUrl: './element-media.component.html',
  styleUrls: ['./element-media.component.scss']
})
export class ElementMediaComponent implements OnInit {
  _viewOnly = true;
  @Input('item') item: any;
  @Input('viewOnly') viewOnly: boolean;
  defaultPic = '../../assets/placeholder-image.jpg';
  thumbnailImage = '../../assets/placeholder-image.jpg';
  audioImage = '../../assets/placeholder-voice.jpg';
  videoImage = '../../assets/placeholder-video.jpg';
  type;
  url;
  @Input()
  set totalPages(viewOnly: boolean) {
    this._viewOnly = viewOnly;
  }
  constructor() { }

  ngOnInit() {
    this.thumbnailImage = this.item.fileURL;
    this.url = (this._viewOnly) ? '' : this.item.fileURL;
  }

  setDefaultPic(type?) {
    if (type === 'video') {
      this.thumbnailImage = this.audioImage;
    }else if (type === 'audio') {
      this.thumbnailImage = this.videoImage;
    }else {
      this.thumbnailImage = this.defaultPic;
    }
  }
}
