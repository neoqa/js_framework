import BasePage from './../../../BasePage';
import getEnvironment from './../../../../../Environments';
import Elements from '../../../../elements/Elements';
import LogInPage from './SignInPage';


export default class WelcomePage extends BasePage {
  constructor(webdriver) {
    super(webdriver, getEnvironment());
  }

  pageWait() {
    this.waitFor({xpath: '//a[@href="/signup"]'});
  }

  logInPage_Open() {
    Elements.button(this.driver, { xpath: '//a[@href="/signin"]' }).click();
    return new LogInPage(this.driver);
  }
}
