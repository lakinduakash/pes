import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EvalListComponent} from './eval-list.component';

describe('EvalListComponent', () => {
  let component: EvalListComponent;
  let fixture: ComponentFixture<EvalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EvalListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
