import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  notificationTeam = "Send me emails when I am added to a team.";
  notificationInspection = "Send me emails when a team member submits an inspection.";

  constructor() { }

  ngOnInit() {
  }

}
