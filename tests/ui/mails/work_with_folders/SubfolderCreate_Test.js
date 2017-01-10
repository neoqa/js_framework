import BaseTest from '../../../../core/webdriver/BaseTest';
import Common_TestActions from './../../CommonTestActions';

// Test actions
function testBody(connect_Page) {
    BaseTest.test.it("Should log in to OneFile with 1File account", () => {
        Common_TestActions.logIn(BaseTest.driver, connect_Page, false);
    });

    BaseTest.test.it("Should create child folder", () => {
        let mails_Page = Common_TestActions.passingPage;
        mails_Page.tutorialSkip();
        mails_Page.subfolderCreate('Root Folder_');
    });

    BaseTest.test.it("Should check created child folder", () => {
        let mails_Page = Common_TestActions.passingPage;
        return mails_Page.subfolderExistenceCheck(true);
    });
}

// Initiate test run
BaseTest.testIt("Create child folder", testBody);