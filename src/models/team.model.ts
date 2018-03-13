export class Team {
  public id: string;
  public name: string;
  public admin: string;
  public image: string;
  constructor(id: string, name: string, admin: string, image: string = null) {
    this.id = id;
    this.name = name;
    this.admin = admin;
  }
}
