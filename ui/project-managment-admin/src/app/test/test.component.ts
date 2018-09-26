import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CanComponentDeactivate} from "../shared/can-deactivate-guard.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, CanComponentDeactivate {

  constructor() {
  }

  ngOnInit() {
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    console.log('canDeactivate has fired in the component!');
    return true;
  }

}
