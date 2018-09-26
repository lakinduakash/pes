import {Component} from '@angular/core';
import {fadeAnimation} from "./shared/animation";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]

})
export class AppComponent {

  constructor() {
  }

}

