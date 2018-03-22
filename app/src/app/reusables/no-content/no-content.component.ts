import { Component, OnInit, Input } from '@angular/core';

//  pass the following into this component
//  emptyContent = {
//    image: string,
//    message: string,
//  }

@Component({
  selector: 'no-content',
  templateUrl: './no-content.component.html',
  styleUrls: ['./no-content.component.scss']
})
export class NoContentComponent implements OnInit {
  @Input('emptyContent') emptyContent: any;

  constructor() { }

  ngOnInit() {
  }

}
