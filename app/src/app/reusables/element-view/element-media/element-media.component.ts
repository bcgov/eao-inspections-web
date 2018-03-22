import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-element-media',
  templateUrl: './element-media.component.html',
  styleUrls: ['./element-media.component.scss']
})
export class ElementMediaComponent implements OnInit {
  @Input('mediaSelected') mediaSelected: any;
  constructor() { }

  ngOnInit() {
  }

}
