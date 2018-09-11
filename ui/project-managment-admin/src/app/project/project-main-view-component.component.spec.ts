import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectMainViewComponentComponent} from './project-main-view-component.component';

describe('ProjectMainViewComponentComponent', () => {
  let component: ProjectMainViewComponentComponent;
  let fixture: ComponentFixture<ProjectMainViewComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectMainViewComponentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMainViewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
