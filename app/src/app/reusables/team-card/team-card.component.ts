import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {
  @Input('team') team: any;
  
  constructor() { }

  ngOnInit() {
  }

  setDefaultPic() {
    this.team.badge = '../../assets/team-logo@2x.png';
  }

}
