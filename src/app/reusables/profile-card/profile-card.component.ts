import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
  @Input('profile') profile: any;
  
  constructor() { }

  setDefaultPic() {
    this.profile.image = '../../assets/avatar@2x.png';
  }

  ngOnInit() {
  }

}
