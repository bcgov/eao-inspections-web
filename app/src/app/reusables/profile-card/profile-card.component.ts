import { Component, OnInit, Input } from '@angular/core';
import * as String from '../../../constants/strings';
import {ProfileService} from '../../../services/profile.service';
import {ToastrService} from 'ngx-toastr';
import {Ng2ImgMaxService} from 'ng2-img-max';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  providers: [Ng2ImgMaxService]
})
export class ProfileCardComponent implements OnInit {
  @Input('profile') profile: any;
  defaultPic = '../../assets/avatar@2x.png';
  constructor(private profileService: ProfileService,
              private toast: ToastrService,
              private ng2ImgMax: Ng2ImgMaxService,
              public sanitizer: DomSanitizer) { }
  selectedPhoto = '../../assets/avatar@2x.png';
  fileToUpload;
  uploadedImage: File;
  imagePreview: string;


  setDefaultPic() {
    this.profile.image = this.defaultPic;
  }

  ngOnInit() {
    this.selectedPhoto = this.profile.profileImage ? this.profile.profileImage : this.defaultPic;
  }

  getPhotoAndUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (_event: any) => {
        this.selectedPhoto = _event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
    this.ng2ImgMax.resizeImage(event.target.files[0], 120, 120).subscribe(
      result => {
        this.fileToUpload = new File([result], result.name);
        this.getImagePreview(this.fileToUpload);
        this.uploadToParse(this.fileToUpload);
      },
      error => {
        console.log('😢 Oh no!', error);
      }
    );
    // this.fileToUpload = event.target.files[0];
    // this.profileService.updateProfileImage(event.target.files[0])
    //   .then((object) => {
    //     this.toast.success('Successfully updated ' + object.get('firstName') + ' ' + object.get('lastName'));
    //   }, (error) => {
    //     this.toast.error(error.message || String.GENERAL_ERROR);
    //   });
  }
  getImagePreview(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
  }
  uploadToParse(uploadFile) {
    this.profileService.updateProfileImage(uploadFile)
      .then((object) => {
        this.toast.success('Successfully updated ' + object.get('firstName') + ' ' + object.get('lastName'));
      }, (error) => {
        this.toast.error(error.message || String.GENERAL_ERROR);
      });
  }
}
