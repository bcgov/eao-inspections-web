import {BasicUser} from './user.model';

export class Inspection {
  public title: string;
  public subtitle: string;
  public inspectionNumber: string;
  public inspector: BasicUser;
  public project: string;
  public startDate: Date;
  public endDate: Date;
  public requirement: string;
  public geoPoint: string;
  public media: string;

  constructor(
    title: string,
    subtitle: string,
    inspectionNumber: string,
    inspector: BasicUser,
    project: string,
    startDate: Date,
    endDate: Date,
    requirement: string,
    geoPoint: string,
    media: string,
    ) {
    this.title = title;
    this.subtitle = subtitle;
    this.inspectionNumber = inspectionNumber;
    this.inspector = inspector;
    this.project = project;
    this.startDate = startDate;
    this.endDate = endDate;
    this.requirement = requirement;
    this.geoPoint = geoPoint;
    this.media = media;
  }

}
