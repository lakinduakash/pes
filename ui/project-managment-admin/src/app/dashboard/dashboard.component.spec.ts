import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardComponent} from './dashboard.component';
import {RouterTestingModule} from "@angular/router/testing";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from "../auth/auth.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {DashboardModule} from "./dashboard.module";
import {DebugElement} from "@angular/core";

fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [DashboardModule, RouterTestingModule, AngularFireModule.initializeApp(environment.firebase, 'myApp'), BrowserAnimationsModule],
      providers: [AuthService, AngularFireAuth, AngularFirestore]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('tool bar title is correct', () => {
    component.renameTitleBar.getTitle().subscribe(next => expect(next).toBe("Project Dashboard"))
  })

  // fit('Dialog is opened when button clicked',()=>{
  //   //component.createDialog();
  //   expect(fixture.nativeElement.querySelector('mat-grid-list')).toBeNull()
  //
  // })

  fit('tool bar title is correct when add project clicked', () => {
    component.createDialog();
    component.renameTitleBar.getTitle().subscribe(next => expect(next).toBe("Add Project"))

  })

});
