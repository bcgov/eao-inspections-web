import { ModalService } from './../../../services/modal.service';
import { Component, Input, Output,EventEmitter } from '@angular/core';

import * as String from '../../../constants/strings';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input('user') user: any;
  @Input('team') team: any;
  @Output() removeMember: EventEmitter<any> = new EventEmitter();
  @Output() editMember: EventEmitter<any> = new EventEmitter();


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


  constructor(private modalService: ModalService) { }

  setDefaultPic() {
    this.user.image = '../../assets/team-logo@2x.png';
  }

  onEditMember(value) {
    this.editMember.emit(value);
   }

  onRemoveMember() {
    this.removeMember.emit(this.user);
  }

  openEdit(modal) {
    this.modalService.open(modal, { size:'lg', backdrop: 'static', keyboard: false });
  }

  openRemove(modal) {
    this.modalService.open(modal, { backdrop: 'static', keyboard: false });
  }
}
