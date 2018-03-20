import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import * as String from '../../../constants/strings';
import { ModalService } from '../../../services/modal.service';
import { AdminService } from '../../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'report-list-item',
  templateUrl: './report-list-item.component.html',
  styleUrls: ['./report-list-item.component.scss'],
  providers: [AdminService, ProfileService]
})
export class ReportListItemComponent implements OnInit {
  @Input('data') data: any;
  @Input('fields') fields: Array<any>;
  @Input('actions') actions: Array<any>;

  user: any;

  setPermissionModal = {
    header: String.PERMISSIONS,
    userButton: String.UPDATE_BUTTON,
  };

  constructor(private profileService: ProfileService, private modalService: ModalService, 
    private adminService: AdminService, private toast: ToastrService) { }

  ngOnInit() {
    this.user = this.profileService.user;
  }

  setDefaultPic() {
    this.data.inspector.image = '../../assets/admin-1@1x.png';
  }

  onSetPermission(report) {
    this.adminService.updateReportPermission(report.id, report.viewOnly).then((result) => {
      this.toast.success('Successfully updated ' + report.title);
    }, (error) => {
      this.toast.error(error.message || String.GENERAL_ERROR);
    });
  }

  open(modal) {
    this.modalService.open(modal, {backdrop: 'static', keyboard: false });
  }

}
