import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectCardComponent} from './project-card.component';
import {DashboardModule} from "../dashboard.module";

fdescribe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [DashboardModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
