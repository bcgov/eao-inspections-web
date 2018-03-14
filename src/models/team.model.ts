export class Team {
  public id: string;
  public name: string;
  public admin: string;
  public color: string;
  public badge: string;
  public users: Array<any>;
  public isActive: Boolean;
  constructor(id: string, name: string, admin: string, color: string, badge: string = null, users: Array<any> = []) {
    this.id = id;
    this.name = name;
    this.admin = admin;
    this.color = color;
    this.badge = badge;
    this.users = users;
    this.isActive = true;
  }
}
