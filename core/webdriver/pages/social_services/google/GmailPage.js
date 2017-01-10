import BasePage from './../../BasePage';
import Elements from '../../../elements/Elements';
import CustomMethods from '../../../other/CustomMethods'
import SignUpPage from './../../onefile/ui/other/SignUpPage';

export default class GmailLogInPage extends BasePage {
  constructor(webdriver) {
    super(webdriver, "https://mail.google.com/mail/");
  }

  pageWait() {
    this.waitFor({ xpath: '//div[@class="z0"]/div' });
  }

  confirmationMail_Open(){
    Elements.button(this.driver, { xpath: '//div[@class="yW"]//span[contains(@name, "OneFile Robot")]' }).click();
    this.waitFor({xpath: '//a[contains(@href, "http://your_url.com/activate-user/")and normalize-space(text())="Confirm Email"]'});
  }

  confirmEmail() {
      // Click on 'Confirm' button
      Elements.button(this.driver, {xpath: '//a[contains(@href, "http://your_url.com/activate-user/")and normalize-space(text())="Confirm Email"]'}).click();
      this.sleep(3);

      // Get all browser insets(drivers)
      let driverHandles = this.driver.getAllWindowHandles();

      // Switch to 1File inset and close Gmail inset
      this.driver.close();
      this.driver = CustomMethods.driverSwitcher(this.driver, driverHandles, 1);

      return new SignUpPage(this.driver);
  }
}


