import { ModalService } from './../../../../services/modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements OnInit {
  title = "Users";
  users = [
      {
        name: "Lou Ballard",
        image: "../../assets/admin-2@4x.png"
      },
      {
        name: "Janet Thorton",
        image: "../../assets/admin-1@4x.png"
      },
      {
        name: "Lydia Baxter",
        image: "../../assets/inspector-profile@4x.png"
      }
    ]

  constructor(private modalService: ModalService) { }

  open(modal) {
    this.modalService.open(modal);
  }

  ngOnInit() {
  }

}
