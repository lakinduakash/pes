import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardCardHolderComponent} from './dashboard-card-holder.component';

describe('DashboardCardHolderComponent', () => {
  let component: DashboardCardHolderComponent;
  let fixture: ComponentFixture<DashboardCardHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardCardHolderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCardHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
