import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'report-list-item',
  templateUrl: './report-list-item.component.html',
  styleUrls: ['./report-list-item.component.scss']
})
export class ReportListItemComponent implements OnInit {
  @Input('data') data: any;

  constructor() { }

  ngOnInit() {
  }

  setDefaultPic() {
    this.data.inspector.image = '../../assets/admin-1@1x.png';
  }

}
