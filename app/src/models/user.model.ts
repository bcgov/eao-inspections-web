import {Team} from './team.model';

export class BasicUser {
  public id: string;
  public firstName: string;
  public lastName: string;
  public name: string;
  public teams: Team[];
  public email: string;
  public image: string;
  public permission: string;
  public access: object;
  

  constructor(
    id: string, firstName: string, lastName: string, name: string, teams: Team[], 
    email: string, image: string, permission: string = null, access: object) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.name = name;
    this.teams = teams;
    this.email = email;
    this.image = image;
    this.permission = permission;
    this.access = access;
  }
}
