import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class RenameTitleBarService {

  private navTitle$: BehaviorSubject<string> = new BehaviorSubject<string>('Default nav title');


  constructor() {
  }

  getTitle(): Observable<string> {
    return this.navTitle$.asObservable();
  }

  setTitle(title) {
    this.navTitle$.next(title);
  }
}
