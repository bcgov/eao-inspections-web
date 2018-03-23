export class Team {
  public id: string;
  public name: string;
  public admin: string;
  public color: string;
  public isActive: boolean;
  public badge: string;
  public numUsers: number;
  public numInspections: number;
  constructor(
    id: string,
    name: string,
    admin: string,
    color: string,
    isActive: boolean,
    badge: string = null,
    numUsers: number = 0,
    numInspections: number = 0) {
    this.id = id;
    this.name = name;
    this.admin = admin;
    this.color = color;
    this.badge = badge;
    this.numUsers = numUsers;
    this.numInspections = numInspections;
    this.isActive = isActive;
  }
}
