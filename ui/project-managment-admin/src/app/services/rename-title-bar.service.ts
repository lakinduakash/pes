import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class RenameTitleBarService {

  private navTitle$: BehaviorSubject<string> = new BehaviorSubject<string>('Project Evaluation System');


  constructor() {
  }

  /**
   * get the nav bar title
   */
  getTitle(): Observable<string> {
    return this.navTitle$.asObservable();
  }

  /**
   * set the nav bar title
   * @param title injected title
   */
  setTitle(title) {
    this.navTitle$.next(title);
  }
}
