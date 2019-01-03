import {Component, OnInit} from '@angular/core';
import {MarkingService} from "../services/marking-service.service";

@Component({
  selector: 'app-marking-view',
  templateUrl: './marking-view.component.html',
  styleUrls: ['./marking-view.component.css']
})
export class MarkingViewComponent implements OnInit {

  constructor(public markingService: MarkingService) {
  }

  ngOnInit() {
    this.markingService.getAllGroupMarksOfPresentation('SFmDmTn08wUfRfwBz5e8', 'sg3w5sqjIklRt5RDEfYZ').subscribe(next => console.log(next))
  }

}
