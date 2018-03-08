import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  @Input('modal') modal: any;
  @Input() closeValue: any;
  @Output() confirmationValue: EventEmitter<any> = new EventEmitter();

  constructor() { }

  conformation(value?: string) {
    this.confirmationValue.emit();
  }

  close() {
    this.closeValue();
  }

  ngOnInit() {
  }

}
