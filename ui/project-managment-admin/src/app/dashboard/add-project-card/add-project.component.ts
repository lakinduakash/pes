import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  @Output() addProject = new EventEmitter();
  @Input() name = "Add new project";


  constructor() {
  }

  ngOnInit() {
  }

  emitClick() {
    this.addProject.emit();
  }

}
