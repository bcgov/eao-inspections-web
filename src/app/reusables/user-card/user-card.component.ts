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
    message: String.ARCHIVE_USER,
    header: String.EDIT_USER,
    userButton: String.EDIT_BUTTON,
    conformationYes: String.ARCHIVE_BUTTON,
    conformationNo: String.CANCEL_BUTTON,
  };

  constructor(private modalService: ModalService) { }

  open(modal) {
    this.modalService.open(modal, { backdrop: 'static', keyboard: false });
  }
}
