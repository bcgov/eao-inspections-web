import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent implements OnInit {
  @Input('user') user: any;

  constructor() { }

  ngOnInit() {
  }

}
