import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ColorPickerService } from 'ngx-color-picker';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.scss']
})
export class TeamModalComponent implements OnInit {
  color: string = "#FDB913";
  @Input('modal') modal: any;
  @Input() closeValue: any;
  @Output() submitValue: EventEmitter<any> = new EventEmitter();

  constructor(private colorPicker: ColorPickerService) { }

  close() {
    this.closeValue();
  } 

  onSubmit(form: NgForm) {
    const teamName = form.value.teamName
    const color = this.color;
    this.submitValue.emit({teamName, color});
  }

  ngOnInit() {
  }

}
