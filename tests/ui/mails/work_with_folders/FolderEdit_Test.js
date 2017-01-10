import BaseTest from '../../../../core/webdriver/BaseTest';
import Common_TestActions from './../../CommonTestActions';

// Test actions
function testBody(connect_Page) {
    BaseTest.test.it("Should log in to OneFile with 1File account", () => {
        Common_TestActions.logIn(BaseTest.driver, connect_Page, false);
    });

    BaseTest.test.it('Should edit root folder', () => {
        let mails_Page = Common_TestActions.passingPage;
        mails_Page.tutorialSkip();
        mails_Page.folderEdit('Root Folder');
    });

    BaseTest.test.it("Should check edited folder", () => {
        let mails_Page = Common_TestActions.passingPage;
        return mails_Page.folderExistenceCheck('Root Folder_', true);
    });
}

// Initiate test run
BaseTest.testIt("Edit root folder", testBody);