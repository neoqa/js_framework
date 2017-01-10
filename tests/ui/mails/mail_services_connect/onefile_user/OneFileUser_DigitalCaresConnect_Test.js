import BaseTest from '../../../../../core/webdriver/BaseTest';
import CommonActions from './../../../CommonTestActions';
import ChakramActions from './../../../../../core/chakram/other/CommonActions';

// Test actions
function testBody(connect_Page) {
  BaseTest.test.it("Should log into OneFile via 1File account", () => {
    CommonActions.logIn(BaseTest.driver, connect_Page, true);
  });

  BaseTest.test.it("Should connect to DigitalCares mail server", () => {
    connect_Page = CommonActions.passingPage;
    let mails_Page = connect_Page.mailClient_Connect('IMAP');
    mails_Page.pageWait();
    CommonActions.passingPage = mails_Page;
  });

  BaseTest.test.it("Should search for email and check sender/folder where it stored", () => {
    let searchRequest = 'Automation test';
    let sender = 'qa_acc@outlook.com';
    let folderName = 'Others';

    CommonActions.email_Search(searchRequest, sender, folderName);
  });

  BaseTest.test.it("Should delete mail account with graphQl query", () => {
    return ChakramActions.oneFile_AccountDelete();
  });
}

// Initiate test run
BaseTest.testIt("Log in via 1File account and connect to DigitalCares", testBody);