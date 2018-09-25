import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFullMarkComponent } from './add-full-mark.component';

describe('AddFullMarkComponent', () => {
  let component: AddFullMarkComponent;
  let fixture: ComponentFixture<AddFullMarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFullMarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFullMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
