export class Observation {
  public id: string;
  public title: string;
  public description: string;
  public requirement: string;
  public coordinate: Geolocation;
  public media: string;
  public createdAt: Date;
  public viewOnly: boolean;

  constructor(id: string,
              title: string,
              description: string,
              requirement: string,
              coordinate: Geolocation,
              media: string,
              createdAt: Date,
              viewOnly: boolean = false) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.requirement = requirement;
    this.coordinate = coordinate;
    this.media = media;
    this.createdAt = createdAt;
    this.viewOnly = viewOnly;
  }

  toText() {
    let text = '';
    const coordinate = (this.coordinate)
    ? '(' + this.coordinate['_latitude'] + ', ' + this.coordinate['_longitude'] + ')'
    : '';

    text += 'Title : ' + (this.title || '')  + '\n';
    text += 'Description : ' + (this.description || '')  + '\n';
    text += 'Requirements : ' + (this.requirement || '')  + '\n';
    text += 'Coordinate : ' + coordinate + '\n';
    text += 'Created Date : ' + (this.createdAt || '')  + '\n';

    return text;
  }
}
