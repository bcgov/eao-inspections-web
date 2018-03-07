import { ModalService } from './../../../services/modal.service';
import { Component, Input } from '@angular/core';

import * as String from '../../../constants/strings';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input('user') user: any;

  modal = {
    message: String.REMOVE_USER,
    header: String.EDIT_USER,
    conformationYes: String.REMOVE_BUTTON,
    conformationNo: String.CANCEL_BUTTON,
  };

  constructor(private modalService: ModalService) { }

  open(modal) {
    this.modalService.open(modal);
  }
}
