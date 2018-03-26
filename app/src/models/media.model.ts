export class Media {
  public id: string;
  public type: string;
  public caption: string;
  public observationId: string;
  public coordinate: Geolocation;
  public fileURL: string;
  public fileName: string;
  public createdAt: Date;

  constructor(id: string,
              type: string,
              caption: string,
              observationId: string,
              coordinate: Geolocation,
              fileURL: string,
              fileName: string,
              createdAt: Date) {
    this.id = id;
    this.type = type;
    this.caption = caption;
    this.observationId = observationId;
    this.coordinate = coordinate;
    this.fileURL = fileURL;
    this.fileName = fileName;
    this.createdAt = createdAt;
  }


  toText() {
    let text = '';
    const coordinate = (this.coordinate)
    ? '(' + this.coordinate['_latitude'] + ', ' + this.coordinate['_longitude'] + ')'
    : '';

    text += 'Caption : ' + (this.caption || '')  + '\n';
    text += 'Coordinate : ' + coordinate  + '\n';
    text += 'Created Date : ' + (this.createdAt || '')  + '\n';

    return text;
  }
}
