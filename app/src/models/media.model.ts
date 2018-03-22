export class Media {
  public id: string;
  public type: string;
  public caption: string;
  public observationId: string;
  public coordinate: Geolocation;
  public fileURL: string;
  public createdAt: Date;

  constructor(id: string,
              type: string,
              caption: string,
              observationId: string,
              coordinate: Geolocation,
              fileURL: string,
              createdAt: Date) {
    this.id = id;
    this.type = type;
    this.caption = caption;
    this.observationId = observationId;
    this.coordinate = coordinate;
    this.fileURL = fileURL;
    this.createdAt = createdAt;
  }
}
