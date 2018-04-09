import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as String from '../../../../constants/strings';

@Component({
  selector: 'member-modal',
  templateUrl: './member-modal.component.html',
  styleUrls: ['./member-modal.component.scss']
})
export class MemberModalComponent {
  @Input('modal') modal: any;
  @Input('data') data: any;
  @Input() closeValue: any;
  @Output() submitValue: EventEmitter<any> = new EventEmitter();
  selectedUserIds: Array<any> = [];
  emptyContent = {
    image: '../../assets/team-member.png',
    message: String.EMPTY_MEMBERS,
  };

  constructor() { }

  onSubmit() {
    this.submitValue.emit(this.selectedUserIds);
  }

  onChangeCheckbox(userId, isChecked) {
    if (isChecked && !this.selectedUserIds.includes(userId)) {
        this.selectedUserIds.push(userId);
    }

    if (!isChecked) {
      const index: number = this.selectedUserIds.indexOf(userId);
      if (index !== -1) {
          this.selectedUserIds.splice(index, 1);
      }
    }
  }

  close() {
    this.closeValue();
  }
}
