import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * This class can use to get data of current path  without subscribing
 * This is unsafe because it have to be set variable manually, dirty value may be exiit
 */
export class FormDataService {

  uid;
  projectId;
  presentationId;

  constructor() {
  }

}
