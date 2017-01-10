import chai from 'chai';
import BasePage from '../../../BasePage';
import getEnvironment from './../../../../../Environments';
import Elements from '../../../../elements/Elements';
import CommonElements from '../../../../elements/CommonElements';
import FbLogInPage from '../../../social_services/facebook/FbLogInPage';
import GmailLogInPage from '../../../social_services/google/GmailLogInPage';
import ClientConnectPage from './../other/ClientConnectPage';
import MailsList_Page from '../app/MailsListPage';
import SignUp_Page from './SignUpPage';

export default class SignInPage extends BasePage {
  constructor(webdriver) {
    super(webdriver, getEnvironment() + "/signin");
  }

  pageWait() {
    this.waitFor({ name: 'email' });
  }

  // LogIn via OneFile user
  logIn(email, password, connectMode){
    Elements.input(this.driver, { name: 'email'  }).sendKeys(email);
    Elements.input(this.driver, { name: 'password'  }).sendKeys(password);
    this.sleep(1);
    Elements.button(this.driver, CommonElements.simple_Button('Sign In')).click();

    // Return different pages
    if(connectMode == true)
      return new ClientConnectPage(this.driver);
    else
      return new MailsList_Page(this.driver);
  }

  // Click on Facebook button
  logIn_Via_Fb(){
    Elements.button(this.driver, { xpath: '//button[text()="Facebook"]' }).click();
    this.sleep(2);
    return new FbLogInPage(this.driver);
  }

  // Click on Gmail button
  logIn_Via_Gmail(){
    Elements.button(this.driver, { xpath: '//button[text()="Gmail"]' }).click();
    this.sleep(2);
    return new GmailLogInPage(this.driver);
  }

  // Go to Sign In page
  open_SignUp(){
    Elements.link(this.driver, {xpath: '//a[@href="/signup"]'}).click();
    return new SignUp_Page(this.driver);
  }

  // Check user deletion
  userDeletion_Check(){
    Elements.input(this.driver, { name: 'email'  }).sendKeys('some_email');
    Elements.input(this.driver, { name: 'password'  }).sendKeys('123456');
    this.sleep(1);
    Elements.button(this.driver, CommonElements.simple_Button('Sign In')).click();
    this.waitFor({className: "form-login-error"});

    // Check error message
    getFormError(this.driver).then(error => {
      chai.expect(error).to.eql('User not found');
    });
  }
}

// Returns link description
function getFormError(driver) {
  return Elements.input(driver, { xpath: '//div[@class="form-login-error"]/p' }).getText();
}