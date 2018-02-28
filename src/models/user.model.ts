import {Team} from './team.model';

export class BasicUser {
  public id: string;
  public name: string;
  public teams: Team[];
  public email: string;
  public image: string;
  public isAdmin: boolean;

  constructor(id: string, name: string, teams: Team[], email: string, image: string, isAdmin: boolean) {
    this.id = id;
    this.name = name;
    this.teams = teams;
    this.email = email;
    this.image = image;
    this.isAdmin = isAdmin;
  }
}
