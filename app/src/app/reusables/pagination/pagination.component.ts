import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input()
  private page: number = 0;
  @Output()
  changePage: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  next() {
    this.changePage.emit(this.page + 1);
  }

  prev() {
    this.changePage.emit(this.page - 1);
  }
}
