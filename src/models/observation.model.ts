export class Observation {
  public title: string;
  public description: string;
  public requirement: string;
  public geopoint: Geolocation;
  public media: string;
  constructor(title: string, description: string, requirement: string, geopoint: Geolocation, media: string) {
    this.title = title;
    this.description = description;
    this.requirement = requirement;
    this.geopoint = geopoint;
    this.media = media;
  }
}
