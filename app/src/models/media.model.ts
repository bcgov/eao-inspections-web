var IMAGE_FILE_EXTENSION = ".jpg";
var VIDEO_FILE_EXTENSION = ".mov";
var AUDIO_FILE_EXTENSION = ".m4a";

export class Media {
  public id: string;
  public type: string;
  public caption: string;
  public observationId: string;
  public coordinate: Geolocation;
  public fileURL: string;
  public fileName: string;
  public createdAt: Date;
  public rawName: string;

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
    this.rawName = '';
  }

  replaceBinaryExtension(extension){
    this.rawName = this.fileName.substr(0, this.fileName.lastIndexOf("."));
    let nonBinaryFilename = this.rawName + extension;
    return nonBinaryFilename;
  }

  getNonBinaryFilename(){
    let nonBinaryFilename = '';
    if(this.type === "Photo") {
      nonBinaryFilename = this.replaceBinaryExtension(IMAGE_FILE_EXTENSION);
    } else if (this.type === 'Video') {
      nonBinaryFilename = this.replaceBinaryExtension(VIDEO_FILE_EXTENSION);
    } else if (this.type === 'Audio') {
      nonBinaryFilename = this.replaceBinaryExtension(AUDIO_FILE_EXTENSION);
    } else {
      console.log('Unknown file type, ', + this.type)
      return this.fileName
    }
    return nonBinaryFilename
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
