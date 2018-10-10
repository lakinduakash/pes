import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreatePresentationDialogComponent} from './create-presentation-dialog.component';

describe('CreatePresentationDialogComponent', () => {
  let component: CreatePresentationDialogComponent;
  let fixture: ComponentFixture<CreatePresentationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePresentationDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePresentationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
