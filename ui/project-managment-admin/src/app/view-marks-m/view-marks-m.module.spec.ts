import { ViewMarksMModule } from './view-marks-m.module';

describe('ViewMarksMModule', () => {
  let viewMarksMModule: ViewMarksMModule;

  beforeEach(() => {
    viewMarksMModule = new ViewMarksMModule();
  });

  it('should create an instance', () => {
    expect(viewMarksMModule).toBeTruthy();
  });
});
