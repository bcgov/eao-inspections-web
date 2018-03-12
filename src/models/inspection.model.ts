import {BasicUser} from './user.model';

export class Inspection {
  public id: string;
  public title: string;
  public subtitle: string;
  public inspectionNumber: string;
  public userId: string;
  public project: string;
  public startDate: Date;
  public endDate: Date;
  public requirement: string;
  public submitted: boolean;
  public team: string;

  constructor(
    id: string,
    title: string,
    subtitle: string,
    inspectionNumber: string,
    userId: string,
    project: string,
    startDate: Date,
    endDate: Date,
    requirement: string,
    submitted: boolean,
    team: string
    ) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.inspectionNumber = inspectionNumber;
    this.userId = userId;
    this.project = project;
    this.startDate = startDate;
    this.endDate = endDate;
    this.requirement = requirement;
    this.submitted = submitted;
    this.team = team;
  }

}
