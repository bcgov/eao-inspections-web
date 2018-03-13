export class Observation {
  public id: string;
  public title: string;
  public description: string;
  public requirement: string;
  public coordinate: Geolocation;
  public media: string;
  public createdAt: Date;

  constructor(id: string,
              title: string,
              description: string,
              requirement: string,
              coordinate: Geolocation,
              media: string,
              createdAt: Date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.requirement = requirement;
    this.coordinate = coordinate;
    this.media = media;
    this.createdAt = createdAt;
  }
}
