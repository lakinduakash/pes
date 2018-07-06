import {Injectable} from '@angular/core';
import {ProjectCard} from "../core/model/project-card";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  id = 0;
  ex = [{id: this.id, owner: "Lakindu", cardTitle: "2nd Year", description: " blah blah blah"}, {
    id: this.id,
    owner: "Ayesh",
    cardTitle: "3rd year",
    description: "blag blah blah"
  }];

  constructor() {
  }

  createProject(projectCard) {
    this.id++;
    return {
      id: this.id,
      owner: projectCard.owner,
      cardTitle: projectCard.cardTitle,
      description: projectCard.description
    } as ProjectCard
  }

  getProjectList() {
    return this.ex as ProjectCard[]
  }
}
