import { Component, OnInit } from '@angular/core';
import { ViewmarksService } from '../services/viewmarks.service';

@Component({
  selector: 'app-view-marks',
  templateUrl: './view-marks.component.html',
  styleUrls: ['./view-marks.component.css']
})
export class ViewMarksComponent implements OnInit {

  constructor(private markService: ViewmarksService) { }

  ngOnInit() {
    this.markService.getMarks().subscribe(marks => {
      console.log(marks);
    });
  }

}
