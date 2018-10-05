import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/login');
  }

  getParagraphText() {
    return element(by.cssContainingText('button', 'Login')).isPresent();
  }
}
