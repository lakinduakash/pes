import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardComponent} from './dashboard.component';
import {RouterTestingModule} from "@angular/router/testing";
import {
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatProgressBarModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from "../auth/auth.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {SharedModule} from "../shared/shared.module";
import {DashboardModule} from "./dashboard.module";

fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [DashboardModule, RouterTestingModule, MatCardModule, MatGridListModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, SharedModule,
        MatProgressBarModule, AngularFireModule.initializeApp(environment.firebase, 'myApp'), BrowserAnimationsModule]
      , providers: [AuthService, AngularFireAuth, AngularFirestore]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('tool bar title is correct', () => {
    component.renameTitleBar.getTitle().subscribe(next => expect(next).toBe("Project Dashboard"))
  })

});
