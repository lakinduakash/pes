import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoadingAnimColorComponent} from './loading-anim-color.component';

describe('LoadingAnimColorComponent', () => {
  let component: LoadingAnimColorComponent;
  let fixture: ComponentFixture<LoadingAnimColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingAnimColorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingAnimColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
