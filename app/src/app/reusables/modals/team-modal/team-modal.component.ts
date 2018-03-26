import { AdminService } from './../../../../services/admin.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ColorPickerService } from 'ngx-color-picker';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.scss']
})
export class TeamModalComponent implements OnInit {
  admins = [];
  color: string = "#FDB913";
  @Input('modal') modal: any;
  @Input('team') team: any;
  @Input() closeValue: any;
  @Output() submitValue: EventEmitter<any> = new EventEmitter();

  constructor(private colorPicker: ColorPickerService, private adminService: AdminService) { }

  close() {
    this.closeValue();
  } 

  onSubmit(form: NgForm, id?: string) {
    const teamName = form.value.teamName;
    const teamAdmin = form.value.admin;
    console.log(teamAdmin);
    if (id) {
      const color = form.value.color;
      this.submitValue.emit({teamName, color, teamAdmin, id});
    } else {
      const color = this.color;
      this.submitValue.emit({teamName, teamAdmin, color});
    }
  }

  ngOnInit() {
    this.adminService.getUsersByRole('admin').then((results) => {
      this.admins = results
    });
  };
   
}
