export class Team {
  public id: string;
  public name: string;
  public admin: string;
  constructor(id: string, name: string, admin: string) {
    this.id = id;
    this.name = name;
    this.admin = admin;
  }
}
