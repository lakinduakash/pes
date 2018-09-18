import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormSavedStatusService {

  constructor() { }

  private _toggle = new Subject();

  toggle$ = this._toggle.asObservable();

  toggle() {
    this._toggle.next();
  }


}
