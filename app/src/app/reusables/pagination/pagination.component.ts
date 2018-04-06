import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() page: number = 0;
  _totalPages = 0;
  @Input()
  set totalPages(totalPages: number) {
      this.pageArray = Array(totalPages).fill(1).map((x,i) => i + 1);
      this._totalPages = totalPages;
  }
  get totalPages() {
    return this._totalPages;
  }
  @Output()
  changePage: EventEmitter<number> = new EventEmitter<number>();
  pageArray: Array<number>;

  constructor() {
  }

  ngOnInit() {
     this.pageArray = Array(this.totalPages).fill(1).map((x,i) => i + 1);
  }

  next() {
    this.changePage.emit(this.page + 1);
  }

  prev() {
    this.changePage.emit(this.page - 1);
  }

  goToPage(pageNum) {
    this.changePage.emit(pageNum - 1);
  }

  checkDisableNext() {
    return ((this.page + 1) === this._totalPages);
  }
}
