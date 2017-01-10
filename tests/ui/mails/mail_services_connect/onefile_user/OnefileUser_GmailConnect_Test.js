import BaseTest from '../../../../../core/webdriver/BaseTest';
import CommonActions from './../../../CommonTestActions';
import ChakramActions from './../../../../../core/chakram/other/CommonActions';

// Test actions
function testBody(connect_Page) {
  BaseTest.test.it("Should log in to OneFile via 1File account", () => {
    CommonActions.logIn(BaseTest.driver, connect_Page, true);
  });

  BaseTest.test.it("Should connect to Gmail mail server", () => {
    connect_Page = CommonActions.passingPage;
    let gmailLogin_Page = connect_Page.mailClient_Connect('GMAIL');
    let mails_Page = gmailLogin_Page.logInTo_OneFile('qa.atmntn@gmail.com', 'Aaa123456', false, false);
    mails_Page.pageWait();
    CommonActions.passingPage = mails_Page;
  });

  BaseTest.test.it("Should search for email and check sender/folder where it stored", () => {
    let searchRequest = '1File automation';
    let sender = 'Sender email';
    let folderName = 'Others';

    CommonActions.email_Search(searchRequest, sender, folderName);
  });

  BaseTest.test.it("Should delete mail account with graphQl query", () => {
    return ChakramActions.oneFile_AccountDelete();
  });
}

// Initiate test run
BaseTest.testIt("Log in via 1File account and connect to Gmail", testBody);