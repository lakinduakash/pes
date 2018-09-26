import {AppPage} from './app.po';

describe('project-managment-admin App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display login button', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual(true);
  });
});
