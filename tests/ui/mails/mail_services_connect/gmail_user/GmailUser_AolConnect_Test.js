import BaseTest from '../../../../../core/webdriver/BaseTest';
import CommonActions from './../../../CommonTestActions';
import ChakramActions from './../../../../../core/chakram/other/CommonActions';

// Test actions
function testBody(connect_Page) {
  BaseTest.test.it("Should log in to OneFile via Gmail", () => {
    CommonActions.logInVia_Gmail(BaseTest.driver, connect_Page, true);
  });

  BaseTest.test.it("Should connect to aol mail server", () => {
    connect_Page = CommonActions.passingPage;
    let mails_Page = connect_Page.mailClient_Connect('AOL');
    mails_Page.pageWait();
    CommonActions.passingPage = mails_Page;
  });

  BaseTest.test.it("Should search for email and check sender/folder where it stored", () => {
    let searchRequest = '1File automation';
    let sender = 'Sender email';
    let folderName = 'Others';

    CommonActions.email_Search(searchRequest, sender, folderName);
  });

  BaseTest.test.it("Should get Gmail user authentication code", () => {
    CommonActions.getGmail_AuthCode(BaseTest.driver);
  });

  BaseTest.test.it("Should delete Gmail user with graphQl query", () => {
    return ChakramActions.gmail_UserDelete(CommonActions.gmailApiCode);
  });
}

// Initiate test run
BaseTest.testIt("Log in via Gmail and connect to Aol", testBody);