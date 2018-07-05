import {Injectable} from '@angular/core';
import {ProjectCard} from "../core/model/project-card";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  id = 0;

  constructor() {
  }

  createProject(projectName) {
    this.id++;
    return {id: this.id, name: projectName} as ProjectCard
  }

  getProjectList() {
    return [{id: this.id, name: "p1"}, {id: this.id, name: "p2"}]
  }
}
