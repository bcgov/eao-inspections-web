import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {Ng2ImgMaxService} from 'ng2-img-max';
import {ToastrService} from 'ngx-toastr';

import { AdminService } from './../../../../services/admin.service';
import * as String from '../../../../constants/strings';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
  providers: [Ng2ImgMaxService]
})
export class UserModalComponent implements OnInit {
  @Input('user') user: any;
  @Input('modal') modal: any;
  @Input() closeValue: any;
  @Output() submitValue: EventEmitter<any> = new EventEmitter();
  selectedPhoto = "../../assets/avatar@2x.png";
  permissions = ["superadmin", "admin", "manager", "inspector", "inspector(view)"];
  fileToUpload;
  imagePreview: string;

  constructor(private toast: ToastrService, private ng2ImgMax: Ng2ImgMaxService) { }
  getPhoto(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (_event: any) => {
        this.selectedPhoto = _event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    this.fileToUpload = event.target.files[0];
    this.ng2ImgMax.resizeImage(event.target.files[0], 10000, 120).subscribe(
      result => {
        this.fileToUpload = new File([result], result.name);
        this.getImagePreview(this.fileToUpload);
      },
      error => {
        this.toast.error(error.message || String.GENERAL_ERROR);
      }
    );
  }
  getImagePreview(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
  }

  onSubmit(form: NgForm, id?: string) {
    const photo = this.fileToUpload;
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const password = form.value.password;
    const permission = form.value.permission;
    if (id) {
      this.submitValue.emit({ firstName, lastName, email, permission, id, photo});
    } else {
      this.submitValue.emit({firstName, lastName, email, password, permission, photo});
    }
  }

  close() {
    this.closeValue();
  }

  ngOnInit() {
    this.selectedPhoto = (this.user && this.user.profileImage) ? this.user.profileImage : this.selectedPhoto;
  }


}
