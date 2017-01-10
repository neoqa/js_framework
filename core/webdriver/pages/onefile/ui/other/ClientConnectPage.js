import BasePage from './../../../BasePage';
import getEnvironment from './../../../../../Environments';
import Elements from '../../../../elements/Elements';
import CommonElements from '../../../../elements/CommonElements';
import GmailLogIn_Page from '../../../social_services/google/GmailLogInPage';
import MailsList_Page from '../app/MailsListPage';


export default class ClientConnectPage extends BasePage {
  constructor(webdriver) {
    super(webdriver, getEnvironment());
  }

  pageWait() {
    this.waitFor(getConnectChoice_Selector('IMAP'));
  }

  mailClient_Connect(client) {
    Elements.button(this.driver, getConnectChoice_Selector(client)).click();
    this.sleep(1);
    Elements.button(this.driver, CommonElements.simple_Button('Continue')).click();

    // If 'Gmail' - follow gmail connect API
    // Else - follow 1File connect flow
    if (client == 'GMAIL') {
      return new GmailLogIn_Page(this.driver);
    }
    else {
      this.waitFor({name: 'email'});
      // Get connect credentials
      let connectionCredentials = connectionCredentials_Define(client);

      // Connect
      Elements.input(this.driver, {name: 'email'}).sendKeys(connectionCredentials[0]);
      Elements.input(this.driver, {name: 'password'}).sendKeys(connectionCredentials[1]);
      if (client == 'IMAP') Elements.input(this.driver, {name: 'host'}).sendKeys(connectionCredentials[2]);
      Elements.button(this.driver, CommonElements.simple_Button('Continue')).click();

      return new MailsList_Page(this.driver);
    }
  }
}

// Values storage
class Values{
  static gmailEmail = 'Some email';
  static yahooEmail = 'Some email';
  static aolEmail = 'Some email';
  static microsoftEmail = 'Some email';
  static password = 'Aaa123456';
  static otherEmail = 'Some email';
  static otherEmailServer = 'Some email';
  static otherEmailPassword = 'test';
}

// Get selector for mail client
function  getConnectChoice_Selector(choiceName) {
  return {className: 'connect-choice ' + choiceName + ' '};
}

// Returns credentials to connect mail client
function connectionCredentials_Define(client) {
  switch(client) {
    case 'GMAIL':
      return [Values.gmailEmail, Values.password];
    case 'YAHOO':
      return [Values.yahooEmail, Values.password];
    case 'AOL':
      return [Values.aolEmail, Values.password];
    case 'OUTLOOK':
      return [Values.microsoftEmail, Values.password];
    case 'EXCHANGE':
      return [Values.microsoftEmail, Values.password];
    case 'IMAP':
      return [Values.otherEmail, Values.otherEmailPassword, Values.otherEmailServer];
  }
}