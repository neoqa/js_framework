import BasePage from '../../../BasePage';
import getEnvironment from './../../../../../Environments';
import Elements from '../../../../elements/Elements';
//import CommonElements from '../../../../elements/CommonElements';
import ClientConnectPage from './../other/ClientConnectPage';

export default class SignUpPage extends BasePage {
  constructor(webdriver) {
    super(webdriver, getEnvironment() + "/signup");
  }

  pageWait() {
    this.waitFor({ name: 'name' });
  }

  // Create account
  createUser(){
    Elements.input(this.driver, { name: 'name'  }).sendKeys('Automation');
    Elements.input(this.driver, { name: 'email'  }).sendKeys('some email');
    Elements.input(this.driver, { name: 'password'  }).sendKeys('123456');
    this.sleep(1);
    Elements.button(this.driver, {xpath: '//div[@class="form-login-submit"]/button'}).click();
    this.waitFor({xpath: '//div[@class="form-login-activate state-normal"]'});
    this.sleep(10); // Wait for sending confirmation email
  }

  // Should log in to created 1File user
  continueWithCreatedUser(){
    this.waitFor({xpath: '//div[@class="form-login-activate state-success"]'});
    this.waitFor({xpath: '//a[contains(@class, "btn") and text()="Continue"]'});
    Elements.button(this.driver, {xpath: '//a[contains(@class, "btn") and text()="Continue"]'}).click();
    return new ClientConnectPage(this.driver);
  }
}