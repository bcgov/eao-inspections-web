import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { AdminService } from '../../../services/admin.service';
import { ModalService } from '../../../services/modal.service';
import { ProfileService } from '../../../services/profile.service';
import { parseUserToModel } from '../../../services/parse.service';
import { ReportService } from '../../../services/report.service';
import * as String from '../../../constants/strings';

@Component({
  selector: 'report-list-item',
  templateUrl: './report-list-item.component.html',
  styleUrls: ['./report-list-item.component.scss'],
  providers: [AdminService, ProfileService, ReportService]
})
export class ReportListItemComponent implements OnInit {
  modal = {
    message: String.ARCHIVE_REPORT,
    secondaryMessage: String.UNARCHIVE_REPORT,
    confirmationYes: String.ARCHIVE_BUTTON,
    secondaryYes: String.UNARCHIVE_BUTTON,
    confirmationNo: String.CANCEL_BUTTON
  };
  @Input('data') data: any;
  @Input('fields') fields: Array<any>;
  @Input('actions') actions: Array<any>;
  @Output() refresh: EventEmitter<any> = new EventEmitter();
  user: any;

  constructor(private profileService: ProfileService, private modalService: ModalService,
    private adminService: AdminService, private reportService: ReportService, private toast: ToastrService) { }

  ngOnInit() {
    const userData = this.profileService.user;
    this.user = parseUserToModel(userData);
  }

  onSetPermission(report) {
    this.adminService.updateReportPermission(report.id, report.viewOnly).then(() => {
      this.toast.success('Successfully updated ' + report.title);
    }, (error) => {
      this.toast.error(error.message || String.GENERAL_ERROR);
    });
  }

  onArchive(id) {
    this.adminService.archiveReport(id).then((result) => {
      this.toast.success('Successfully Archived Inspection');
      this.refresh.emit();
    }, (error) => {
      this.toast.error(error.message || String.GENERAL_ERROR);
    });
  }

  onUnArchive(id) {
    this.adminService.unArchiveReport(id).then((result) => {
      this.toast.success('Successfully Unarchived Inspection');
      this.refresh.emit();
    }, (error) => {
      this.toast.error(error.message || String.GENERAL_ERROR);
    });
  }

  onDownload(report) {
    this.reportService.download(report).then(() => {
      this.toast.success('Successfully downloaded ' + report.title);
    }).catch((error) => {
      this.toast.error(error.message || String.GENERAL_ERROR);
    });
  }

  open(modal) {
    this.modalService.open(modal, {backdrop: 'static', keyboard: false });
  }
}
