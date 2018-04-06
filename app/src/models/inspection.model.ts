import { BasicUser } from "./user.model";
import { Team } from "./team.model";

export class Inspection {
  public id: string;
  public title: string;
  public subtitle: string;
  public inspectionNumber: string;
  public inspector: BasicUser;
  public project: string;
  public startDate: Date;
  public endDate: Date;
  public updatedAt: Date;
  public requirement: string;
  public submitted: boolean;
  public isActive: boolean;
  public team: Team;
  public viewOnly: boolean;

  constructor(
    id: string,
    title: string,
    subtitle: string,
    inspectionNumber: string,
    inspector: BasicUser,
    project: string,
    startDate: Date,
    endDate: Date,
    updatedAt: Date,
    requirement: string,
    submitted: boolean,
    isActive: boolean,
    team: Team = null,
    viewOnly: boolean = false,
    ) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.inspectionNumber = inspectionNumber;
    this.inspector = inspector;
    this.project = project;
    this.startDate = startDate;
    this.endDate = endDate;
    this.updatedAt = updatedAt;
    this.requirement = requirement;
    this.submitted = submitted;
    this.isActive = isActive;
    this.team = team;
    this.viewOnly = viewOnly;
  }

  toText() {
    let text = '';
    text += 'Number : ' + (this.inspectionNumber || '')  + '\n';
    text += 'Title : ' + (this.title || '')  + '\n';
    text += 'Inspector : ' + (this.inspector.firstName + ' ' + this.inspector.lastName || '')  + '\n';
    text += 'Start Date : ' + (this.startDate || '')  + '\n';
    text += 'End Date : ' + (this.endDate || '')  + '\n';
    text += 'Updated Date : ' + (this.updatedAt || '')  + '\n';
    text += 'Linked Projects : ' + (this.project || '')  + '\n';

    return text;
  }
}
