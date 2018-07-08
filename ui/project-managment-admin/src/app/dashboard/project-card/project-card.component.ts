import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProjectCard} from "../../core/model/project-card";

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent implements OnInit {

  @Input("card") cardDetails: ProjectCard;
  @Output("remove") remove = new EventEmitter();

  id;
  cardTitle;
  description;
  owner;


  constructor() { }

  ngOnInit() {
    this.id = this.cardDetails.id;
    this.cardTitle = this.cardDetails.cardTitle;
    this.description = this.cardDetails.description;
    this.owner = this.cardDetails.owner;
  }

  removeProject() {
    this.remove.emit(this.id);
  }

}
