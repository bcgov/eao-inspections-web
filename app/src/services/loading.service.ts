import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';

@Injectable()
export class LoadingService {

  private _loading: Subject<boolean>;
  private id;


  constructor() {
    this._loading = new Subject<boolean>();
  }

  loading(): Observable<boolean> {
      return this._loading.asObservable();
  }

  showLoading(bool, id): void {
    if (bool) {
      this.id = id;
      this._loading.next(bool);
    } else {
      if (this.id === id) {
        this._loading.next(bool);
      }
    }
  }
}
