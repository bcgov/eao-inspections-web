import { Component, Input } from '@angular/core';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent {
  @Input('modal') modal: any;
  @Input() closeValue: any;

  constructor() { }

  close() {
    this.closeValue();
  }
}
