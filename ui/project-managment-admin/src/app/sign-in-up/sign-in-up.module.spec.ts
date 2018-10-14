import {SignInUpModule} from './sign-in-up.module';

describe('SignInUpModule', () => {
  let signInUpModule: SignInUpModule;

  beforeEach(() => {
    signInUpModule = new SignInUpModule();
  });

  it('should create an instance', () => {
    expect(signInUpModule).toBeTruthy();
  });
});
