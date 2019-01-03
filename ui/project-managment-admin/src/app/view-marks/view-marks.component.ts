import { Component, OnInit } from '@angular/core';
import { ViewmarksService } from '../services/viewmarks.service';
import { Marks } from '../interfaces/marks';

@Component({
  selector: 'app-view-marks',
  templateUrl: './view-marks.component.html',
  styleUrls: ['./view-marks.component.css']
})
export class ViewMarksComponent implements OnInit {

  

  constructor(private markService: ViewmarksService) { }

  marks: Marks[];

  ngOnInit() {
    this.markService.getMarks().subscribe(marks => {
      //console.log(marks);
      this.marks = marks;
      //console.log(marks[0]['sections']);
    });
  }

}
