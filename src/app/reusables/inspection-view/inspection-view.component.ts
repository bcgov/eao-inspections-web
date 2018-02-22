import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'inspection-view',
  templateUrl: './inspection-view.component.html',
  styleUrls: ['./inspection-view.component.scss']
})
export class InspectionViewComponent implements OnInit {
  title = "Inspection";
  subTitle = "Observation Elements";
  link = "/team-reports/team/id";

  constructor() { }

  ngOnInit() {
  }

}
