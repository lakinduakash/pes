import {DashboardModule} from './dashboard.module';

fdescribe('DashboardModule', () => {
  let dashboardModule: DashboardModule;

  beforeEach(() => {
    dashboardModule = new DashboardModule();
  });

  fit('should create an instance', () => {
    expect(dashboardModule).toBeTruthy();
  });
});
