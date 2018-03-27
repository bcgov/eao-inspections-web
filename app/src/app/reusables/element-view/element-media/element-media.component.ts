import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-element-media',
  templateUrl: './element-media.component.html',
  styleUrls: ['./element-media.component.scss']
})
export class ElementMediaComponent implements OnInit {
  @Input('item') item: any;
  defaultPic = '../../assets/placeholder-voice.jpg';
  thumbnailImage = '../../assets/placeholder-voice.jpg';
  audioImage = '../../assets/placeholder-voice.jpg';
  type;
  constructor() { }

  ngOnInit() {
    this.thumbnailImage = this.item.fileURL;
  }

  setDefaultPic() {
    this.thumbnailImage = this.defaultPic;
  }
}
