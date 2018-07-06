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
import {AddProjectComponent} from "../add-project-card/add-project.component";

@Component({
  selector: 'app-dashboard-card-holder',
  templateUrl: './dashboard-card-holder.component.html',
  styleUrls: ['./dashboard-card-holder.component.css']
})
export class DashboardCardHolderComponent implements OnInit {

  componentRef: ComponentRef<AddProjectComponent>;

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  @Output('addProject') addProject = new EventEmitter();

  @Input() set cardName(name: string) {
    const factory: ComponentFactory<AddProjectComponent> = this.resolver.resolveComponentFactory(AddProjectComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.name = name;
    this.componentRef.instance.addProject.subscribe(next => {
      this.addProject.emit();
      console.log("clicked")
    })

  }

  constructor(private resolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
  }


}
