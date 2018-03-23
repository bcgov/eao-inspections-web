import { AdminService } from './../../../../services/admin.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as String from '../../../../constants/strings';
import { parseToJSON } from '../../../../services/parse.service';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  selectedPhoto = "../../assets/avatar@2x.png";
  teams = [];
  permissions = ["superadmin", "admin", "manager", "inspector", "inspector(view)"];
  fileToUpload;

  @Input('modal') modal: any;
  @Input() closeValue: any;
  @Input('user') user: any;
  @Output() submitValue: EventEmitter<any> = new EventEmitter();

  constructor(private adminService: AdminService) { }

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

  onSubmit(form: NgForm, id?: string) {
    const photo = this.fileToUpload;
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const password = form.value.password;
    const team = form.value.team;
    const permission = form.value.permission;
    if (id) {
      this.submitValue.emit({ firstName, lastName, email, permission, id, photo});
    } else {
      this.submitValue.emit({firstName, lastName, email, password, team, permission, photo});
    }
  }

  close() {
    this.closeValue();
  }

  ngOnInit() {
    this.adminService.getActiveTeams()
    .then((results) => {
         this.teams = results;
     });
  }

}
