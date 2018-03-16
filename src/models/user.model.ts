import {Team} from './team.model';

export class BasicUser {
  public id: string;
  public firstName: string;
  public lastName: string;
  public name: string;
  public teams: Team[];
  public email: string;
  public image: string;
  public isAdmin: boolean;
  public isSuperAdmin: boolean;
  public permission: string;
  

  constructor(
    id: string, firstName: string, lastName: string, name: string, teams: Team[], 
    email: string, image: string, isAdmin: boolean, isSuperAdmin: boolean, permission: string = null) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.name = name;
    this.teams = teams;
    this.email = email;
    this.image = image;
    this.isAdmin = isAdmin;
    this.isSuperAdmin = isSuperAdmin;
    this.permission = permission;
  }
}
