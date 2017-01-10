import BasePage from './../../BasePage';
import Elements from '../../../elements/Elements';
import CustomMethods from '../../../other/CustomMethods'
import MailsList_Page from '../../onefile/ui/app/MailsListPage';
import ClientConnectPage from './../../onefile/ui/other/ClientConnectPage';

export default class FacebookLogInPage extends BasePage {
  constructor(webdriver) {
    super(webdriver, "https://www.facebook.com");
  }

  getSpecialPage(){
    this.driver.get(this.url + '/login.php?skip_api_login=1&api_key=1530130513977447&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fv2.5%2Fdialog%2Foauth%3Fredirect_uri%3Dhttp%253A%252F%252Fyour_url.com%252Fsocial%252Fauth%252FFB%252Fredirect%26state%3Dc855ea5a7e3dcc2d1a9b5576acb6cc39%26scope%3Demail%26response_type%3Dcode%26client_id%3D1530130513977447%26ret%3Dlogin%26sdk%3Dphp-sdk-5.3.1');
    this.waitFor({ xpath: '//div[@id="app"]//div[text()="Loading"]' });
    return this;
  }

  pageWait() {
    this.waitFor({ name: 'email' });
  }

  logIn(email, password, connectMode){
    // Switch to Facebook window
    let driverHandles = this.driver.getAllWindowHandles();
    this.driver = CustomMethods.driverSwitcher(this.driver, driverHandles, 1);

    // LogIn
    this.pageWait();
    Elements.input(this.driver, { id: 'email'  }).sendKeys(email);
    Elements.input(this.driver, { id: 'pass'  }).sendKeys(password);
    Elements.button(this.driver, { id: 'loginbutton' }).click();

    // Switch back to OneFile window
    this.driver = CustomMethods.driverSwitcher(this.driver, driverHandles, 0);

    // Return different pages
    if(connectMode == true)
      return new ClientConnectPage(this.driver);
    else
      return new MailsList_Page(this.driver);
  }
}


