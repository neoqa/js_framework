import BasePage from './../../BasePage';
import Elements from '../../../elements/Elements';
import CustomMethods from '../../../other/CustomMethods'
import MailsList_Page from '../../onefile/ui/app/MailsListPage';
import ClientConnectPage from './../../onefile/ui/other/ClientConnectPage';
import GmailPage from './GmailPage';

export default class GmailLogInPage extends BasePage {
  constructor(webdriver) {
    super(webdriver, "https://accounts.google.com/");
  }

  // Redirect to 'https://mail.google.com'
  goToGmail_Page(){
    this.driver.get('https://mail.google.com/');
    return this;
  }

  // Open page which will return api code
  getSpecialPage(password){
    this.driver.get(this.url + 'ServiceLogin?passive=1209600&continue=https://accounts.google.com/o/oauth2/auth?access_type%3Doffline%26approval_prompt%3Dauto%26scope%3Demail%26response_type%3Dcode%26redirect_uri%3Dhttp://your_url.com/social/auth/GMAIL/redirect%26client_id%3D635325369630-0urthd2n9shgdqv8ss60ran6lqev5sge.apps.googleusercontent.com');
    this.waitFor({ id: 'Passwd'});
    Elements.input(this.driver, { id: 'Passwd'  }).sendKeys(password);
    Elements.button(this.driver, { id: 'signIn' }).click();
    this.waitFor({ xpath: '//div[@id="app"]//div[text()="Loading"]' });
    return this;
  }

  pageWait() {
    this.waitFor({ id: 'Email' });
  }

  logInTo_OneFile(email, password, connectMode, skipEmail){
    // Switch to Gmail window
    let driverHandles = this.driver.getAllWindowHandles();
    this.driver = CustomMethods.driverSwitcher(this.driver, driverHandles, 1);

    // LogIn
    if(skipEmail == false) {
      this.pageWait();
      Elements.input(this.driver, {id: 'Email'}).sendKeys(email);
      Elements.button(this.driver, {id: 'next'}).click();
    }
    this.waitFor({ id: 'Passwd'});
    Elements.input(this.driver, { id: 'Passwd'  }).sendKeys(password);
    Elements.button(this.driver, { id: 'signIn' }).click();

    // Give permission
    if(connectMode == false) {
      this.waitFor({id: 'submit_approve_access'});
      this.sleep(5);
      Elements.button(this.driver, {id: 'submit_approve_access'}).click();
    }

    // Switch back to OneFile window
    this.driver = CustomMethods.driverSwitcher(this.driver, driverHandles, 0);

    // Return different pages
    if(connectMode == true)
      return new ClientConnectPage(this.driver);
    else
      return new MailsList_Page(this.driver);
  }

  givePermission(){
    // Switch to Gmail window
    let driverHandles = this.driver.getAllWindowHandles();
    this.driver = CustomMethods.driverSwitcher(this.driver, driverHandles, 1);

    // Give permission
    this.waitFor({id: 'submit_approve_access'});
    this.sleep(5);
    Elements.button(this.driver, {id: 'submit_approve_access'}).click();

    // Switch back to OneFile window
    this.driver = CustomMethods.driverSwitcher(this.driver, driverHandles, 0);

    return new MailsList_Page(this.driver);
  }

  logInTo_Gmail(email, password){
    // Set email
    this.pageWait();
    Elements.input(this.driver, {id: 'Email'}).sendKeys(email);
    Elements.button(this.driver, {id: 'next'}).click();

    // Set password and sign in
    this.waitFor({ id: 'Passwd'});
    Elements.input(this.driver, { id: 'Passwd'  }).sendKeys(password);
    Elements.button(this.driver, { id: 'signIn' }).click();

    return new GmailPage(this.driver);
  }
}


