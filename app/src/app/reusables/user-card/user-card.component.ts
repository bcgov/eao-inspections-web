import { Component, Input, Output,EventEmitter } from '@angular/core';

import * as String from '../../../constants/strings';
import { ModalService } from './../../../services/modal.service';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  editModal = {
    message: String.ARCHIVE_USER,
    header: String.EDIT_USER,
    userButton: String.EDIT_BUTTON,
    confirmationYes: String.ARCHIVE_BUTTON,
    confirmationNo: String.CANCEL_BUTTON,
    edit: true,
  };
  removeModal = {
    message: String.REMOVE_USER,
    header: String.REMOVE_USER,
    userButton: String.REMOVE_BUTTON,
    confirmationYes: String.REMOVE_BUTTON,
    confirmationNo: String.CANCEL_BUTTON
  };
  @Input('user') user: any;
  @Input('team') team: any;
  @Output() removeMember: EventEmitter<any> = new EventEmitter();
  @Output() editMember: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: ModalService) { }

  onEditMember(value) {
    this.editMember.emit(value);
   }

  onRemoveMember() {
    this.removeMember.emit(this.user);
  }

  openEdit(modal) {
    this.modalService.open(modal, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  openRemove(modal) {
    this.modalService.open(modal, { backdrop: 'static', keyboard: false });
  }
}
