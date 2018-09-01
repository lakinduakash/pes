import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SectionComponentComponent} from './section-component.component';

describe('SectionComponentComponent', () => {
  let component: SectionComponentComponent;
  let fixture: ComponentFixture<SectionComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SectionComponentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
