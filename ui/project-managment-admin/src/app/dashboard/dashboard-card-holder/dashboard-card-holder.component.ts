import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ProjectCardComponent} from "../project-card/project-card.component";
import {ProjectCard} from "../../core/model/project-card";

@Component({
  selector: 'app-dashboard-card-holder',
  templateUrl: './dashboard-card-holder.component.html',
  styleUrls: ['./dashboard-card-holder.component.css']
})
export class DashboardCardHolderComponent implements OnInit {

  componentRef: ComponentRef<ProjectCardComponent>;

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  @Output('addProject') addProject = new EventEmitter();

  @Input() set projectCard(details: ProjectCard) {
    const factory: ComponentFactory<ProjectCardComponent> = this.resolver.resolveComponentFactory(ProjectCardComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.cardDetails = details

  }

  constructor(private resolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
  }


}
