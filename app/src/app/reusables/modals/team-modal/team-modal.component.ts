import { Component,EventEmitter, OnInit, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ColorPickerService } from 'ngx-color-picker';

import { AdminService } from './../../../../services/admin.service';

@Component({
  selector: 'team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.scss']
})
export class TeamModalComponent implements OnInit {
  @Input('modal') modal: any;
  @Input('team') team: any;
  @Input() closeValue: any;
  @Output() submitValue: EventEmitter<any> = new EventEmitter();
  admins = [];
  selectedPhoto = '../../assets/avatar@2x.png';
  color = '#FDB913';
  fileToUpload;

  constructor(private colorPicker: ColorPickerService, private adminService: AdminService) { }

  getPhoto(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (_event: any) => {
        this.selectedPhoto = _event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
    this.fileToUpload = event.target.files[0];
  }

  close() {
    this.closeValue();
  }

  onSubmit(form: NgForm, id?: string) {
    const photo = this.fileToUpload;
    const teamName = form.value.teamName;
    const teamAdmin = form.value.admin;
    if (id) {
      const color = form.value.color;
      this.submitValue.emit({teamName, color, teamAdmin, id, photo});
    } else {
      const color = this.color;
      this.submitValue.emit({teamName, teamAdmin, color, photo});
  }
}

  ngOnInit() {
    this.adminService.getUsersByRole('admin').then((results) => {
      this.admins = results
    });
    this.selectedPhoto = (this.team && this.team.badge) ? this.team.badge : this.selectedPhoto;
  };

}
