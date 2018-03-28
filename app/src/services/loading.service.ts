import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs';

@Injectable()
export class LoadingService {

  private _loading: Subject<boolean>;
  private timeoutId;

  constructor() {
    this._loading = new Subject<boolean>();
  }

  loading(): Observable<boolean> {
      return this._loading.asObservable();
  }

  showLoading(bool): void {
    if (!bool) {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this._loading.next(bool);
      }, 1000);
      this._loading.next(bool);
    } else {
      this._loading.next(bool);
    }
  }
}
