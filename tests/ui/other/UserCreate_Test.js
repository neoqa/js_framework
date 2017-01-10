import BaseTest from '../../../core/webdriver/BaseTest';
import WelcomePage from '../../../core/webdriver/pages/onefile/ui/other/WelcomePage';
import GmailLogIn_Page from '../../../core/webdriver/pages/social_services/google/GmailLogInPage';
import CommonActions from './../CommonTestActions';

// Test actions
function testBody() {
    BaseTest.test.it("Should create user", () => {
        let welcome_Page = new WelcomePage(BaseTest.driver);
        welcome_Page.getPage();
        welcome_Page.pageWait();

        let logIn_Page = welcome_Page.logInPage_Open();
        logIn_Page.pageWait();

        let signUp_Page = logIn_Page.open_SignUp();
        signUp_Page.createUser();
    });

    BaseTest.test.it("Should confirm user via Gmail", () => {
        let gmail_LogIn_Page = new GmailLogIn_Page(BaseTest.driver);
        gmail_LogIn_Page.goToGmail_Page();
        let gmail_Page = gmail_LogIn_Page.logInTo_Gmail('Your login', 'Your password');
        gmail_Page.confirmationMail_Open();
        CommonActions.passingPage = gmail_Page.confirmEmail();
    });

    BaseTest.test.it("Should log in to 'connect page' with created user", () => {
        let signUp_Page = CommonActions.passingPage;
        let connectPage = signUp_Page.continueWithCreatedUser();
        connectPage.pageWait();
    });
}

// Initiate test run
BaseTest.testIt("Create 1File user", testBody);