import * as String from './../../../../constants/strings';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports-view',
  templateUrl: './reports-view.component.html',
  styleUrls: ['./reports-view.component.scss']
})
export class ReportsViewComponent implements OnInit {
  title = "Inspections";

  emptyContent = {
    image: "../../assets/inspections.png",
    message: String.EMPTY_INSPECTIONS,
  };
  teams = []

  constructor() { }

  ngOnInit() {
  }

}
