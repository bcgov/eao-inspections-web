export class Team {
  public id: string;
  public name: string;
  public admin: string;
  public color: string;
  public isActive: Boolean;
  public badge: string;
  public users: Array<any>;
  constructor(id: string, name: string, admin: string, color: string, isActive: Boolean, badge: string = null, users: Array<any> = []) {
    this.id = id;
    this.name = name;
    this.admin = admin;
    this.color = color;
    this.badge = badge;
    this.users = users;
    this.isActive = isActive;
  }
}
