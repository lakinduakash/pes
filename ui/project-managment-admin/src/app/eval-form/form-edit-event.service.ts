import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormEditEventService {

  constructor() {
  }

  //This will save the g=form edit evant and emit them
  event = new EventEmitter()

}
