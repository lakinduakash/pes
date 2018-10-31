import {AppRoutingModule} from './app-routing.module';

fdescribe('AppRoutingModule', () => {
  let appRoutingModule: AppRoutingModule;

  beforeEach(() => {
    appRoutingModule = new AppRoutingModule();
  });

  fit('should create an instance', () => {
    expect(appRoutingModule).toBeTruthy();
  });
});
