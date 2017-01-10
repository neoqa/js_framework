import BaseTest from '../../../../../core/webdriver/BaseTest';
import CommonActions from './../../../CommonTestActions';
import ChakramActions from './../../../../../core/chakram/other/CommonActions';

// Test actions
function testBody(connect_Page) {
  BaseTest.test.it("Should log into OneFile via Facebook", () => {
    CommonActions.logInVia_Fb(BaseTest.driver, connect_Page, true);
  });

  BaseTest.test.it("Should connect to Yahoo mail server", () => {
    connect_Page = CommonActions.passingPage;
    let mails_Page = connect_Page.mailClient_Connect('YAHOO');
    mails_Page.pageWait();
    CommonActions.passingPage = mails_Page;
  });

  BaseTest.test.it("Should search for email and check sender/folder where it stored", () => {
    let searchRequest = '1File automation';
    let sender = 'Sender email';
    let folderName = 'Others';

    CommonActions.email_Search(searchRequest, sender, folderName);
  });

  BaseTest.test.it("Should get facebook user authentication code", () => {
    CommonActions.getFb_AuthCode(BaseTest.driver);
  });

  BaseTest.test.it("Should delete facebook user with graphQl query", () => {
    return ChakramActions.facebook_UserDelete(CommonActions.fbApiCode);
  });
}

// Initiate test run
BaseTest.testIt("Log in via Facebook and connect to Yahoo", testBody);