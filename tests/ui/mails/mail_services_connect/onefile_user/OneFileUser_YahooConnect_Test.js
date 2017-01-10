import BaseTest from '../../../../../core/webdriver/BaseTest';
import CommonActions from './../../../CommonTestActions';
import ChakramActions from './../../../../../core/chakram/other/CommonActions';

// Test actions
function testBody(connect_Page) {
  BaseTest.test.it("Should log into OneFile with 1File account", () => {
    CommonActions.logIn(BaseTest.driver, connect_Page, true);
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

  BaseTest.test.it("Should delete mail account with graphQl query", () => {
    return ChakramActions.oneFile_AccountDelete();
  });
}

// Initiate test run
BaseTest.testIt("Log in with 1File account and connect to Yahoo", testBody);