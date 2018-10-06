import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestComponent} from './test.component';
import {EvalFormModule} from "../eval-form/eval-form.module";
import {EvalFormParserModule} from "../eval-form-parser/eval-form-parser.module";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";
import {AuthService} from "../auth/auth.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {RouterTestingModule} from "@angular/router/testing";

fdescribe('TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [EvalFormModule, EvalFormParserModule, AngularFireModule.initializeApp(environment.firebase, 'myApp'), RouterTestingModule],
      providers: [AngularFirestore, AuthService, AngularFireAuth]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
