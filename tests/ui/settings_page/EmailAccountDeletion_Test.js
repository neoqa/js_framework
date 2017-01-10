import BaseTest from '../../../core/webdriver/BaseTest';
import Common_TestActions from './../CommonTestActions';
import Common_PagesActions from './../../../core/webdriver/other/CommonActions';

// Test actions
function testBody(connect_Page) {
    BaseTest.test.it("Should log in to OneFile via 1File account", () => {
        Common_TestActions.logIn(BaseTest.driver, connect_Page, true);
    });

    BaseTest.test.it("Should connect to DigitalCares email server", () => {
        connect_Page = Common_TestActions.passingPage;
        let mails_Page = connect_Page.mailClient_Connect('IMAP');
        mails_Page.pageWait();
        mails_Page.tutorialSkip();
    });

    BaseTest.test.it("Should delete account through settings page", () => {
        let settings_Page = Common_PagesActions.menuNavBy_Link(BaseTest.driver, 'accounts');
        settings_Page.account_Delete();
        Common_TestActions.passingPage = settings_Page;
    });

    BaseTest.test.it("Should check account deletion", () => {
        let settings_Page = Common_TestActions.passingPage;
        return settings_Page.accountDeletion_Check();
    });

    BaseTest.test.it("Should user out from 1File app", () => {
        Common_PagesActions.user_Out(BaseTest.driver);
    });
}

// Initiate test run
BaseTest.testIt("Delete email account through settings page", testBody);