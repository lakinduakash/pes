import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MarkingViewComponent} from './marking-view.component';

describe('MarkingViewComponent', () => {
  let component: MarkingViewComponent;
  let fixture: ComponentFixture<MarkingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarkingViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
