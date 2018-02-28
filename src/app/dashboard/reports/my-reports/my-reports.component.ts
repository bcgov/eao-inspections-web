import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-reports',
  templateUrl: './my-reports.component.html',
  styleUrls: ['./my-reports.component.scss']
})
export class MyReportsComponent implements OnInit {
  content = [{
    image: "../../assets/report@2x.png",
    message: "There is no report yet."
  }]
  
  title = "My Reports";

  constructor() { }

  ngOnInit() {
  }

}
