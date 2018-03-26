import { AdminService } from './../../../../../services/admin.service';
import { ModalService } from './../../../../../services/modal.service';
import { Component, OnInit, Input } from '@angular/core';
import * as String from '../../../../../constants/strings';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'admin-team-card',
  templateUrl: './admin-team-card.component.html',
  styleUrls: ['./admin-team-card.component.scss']
})
export class AdminTeamCardComponent implements OnInit {
  @Input('team') team: any;
  modal = {
    edit: true,
    message: String.ARCHIVE_TEAM,
    secondaryMessage: String.UNARCHIVE_TEAM,
    header: String.EDIT_TEAM,
    userButton: String.EDIT_BUTTON,
    confirmationYes: String.ARCHIVE_BUTTON,
    secondaryYes: String.UNARCHIVE_BUTTON,
    confirmationNo: String.CANCEL_BUTTON,
  };

  cantArchiveModal = {
    message: String.ARCHIVE_MESSAGE,
    confirmationYes: String.OK_BUTTON,
    confirmationNo: String.CANCEL_BUTTON,
  };

  constructor(
    private modalService: ModalService,
    private adminService: AdminService,
    private toast: ToastrService
  ) { }

  open(modal) {
    this.modalService.open(modal, { backdrop: 'static', keyboard: false });
  }

  onEdit(value) {
    this.adminService.updateTeam(value.id, value.teamName, value.color, value.photo).then((object) => {
      this.toast.success('Successfully updated ' + object.get('name'));
    }, (error) => {
      this.toast.error(error.message || String.GENERAL_ERROR);
    });
  }

  onUnarchive(value) {
    this.adminService.unArchiveTeam(value).then((object) => {
      this.toast.success('Successfully unarchived ' + object.get('name'));
    }, (error) => {
      this.toast.error(error.message || String.GENERAL_ERROR);
    });
  }

  onArchive(value) {
    this.adminService.archiveTeam(value).then((object) => {
      this.toast.success('Successfully archived ' + object.get('name'));
    }, (error) => {
      this.toast.error(error.message || String.GENERAL_ERROR);
    });
  }

  ngOnInit() {
  }
}
