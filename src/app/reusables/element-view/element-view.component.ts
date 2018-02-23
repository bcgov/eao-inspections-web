import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-element-view',
  templateUrl: './element-view.component.html',
  styleUrls: ['./element-view.component.scss']
})
export class ElementViewComponent implements OnInit {
  title = "Element 1";
  subTitle = "Attached Media";
  link = "/inspection-details";

  constructor() { }

  ngOnInit() {
  }

}
