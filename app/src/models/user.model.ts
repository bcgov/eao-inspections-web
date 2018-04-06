import {Team} from './team.model';

export class BasicUser {
  public id: string;
  public firstName: string;
  public lastName: string;
  public name: string;
  public teams: Team[];
  public email: string;
  public profileImage: string;
  public permission: string;
  public access: object;
  public hasLoggedIn: boolean;
  public isActive: boolean;


  constructor(
    id: string, firstName: string, lastName: string, name: string, teams: Team[],
    email: string, profileImage: string, permission: string = null, access: object, hasLoggedIn: boolean, isActive: boolean) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.name = name;
    this.teams = teams;
    this.email = email;
    this.profileImage = profileImage;
    this.permission = permission;
    this.access = access;
    this.hasLoggedIn = hasLoggedIn;
    this.isActive = isActive;
  }
}
