import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.scss']
})
export class TeamModalComponent implements OnInit {
  @Input('modal') modal: any;
  @Input() closeValue: any;

  constructor() { }

  close() {
    this.closeValue();
  } 

  ngOnInit() {
  }

}
