import { ModalService } from './../../../../../services/modal.service';
import { Component, OnInit, Input } from '@angular/core';
import * as String from '../../../../../constants/strings';

@Component({
  selector: 'admin-team-card',
  templateUrl: './admin-team-card.component.html',
  styleUrls: ['./admin-team-card.component.scss']
})
export class AdminTeamCardComponent implements OnInit {
  @Input('team') team: any;
  modal = {
    message: String.ARCHIVE_TEAM,
    secondaryMessage: String.UNARCHIVE_TEAM,
    header: String.EDIT_TEAM,
    userButton: String.EDIT_BUTTON,
    conformationYes: String.ARCHIVE_BUTTON,
    secondaryYes: String.UNARCHIVE_BUTTON,
    conformationNo: String.CANCEL_BUTTON,
  };

  constructor(private modalService: ModalService) { }

  open(modal) {
    this.modalService.open(modal);
  }

  ngOnInit() {
  }

  setDefaultPic() {
    this.team.image = '../../assets/team-logo@2x.png';
  }
}
