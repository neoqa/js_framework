import BaseTest from '../../../../core/webdriver/BaseTest';
import Common_TestActions from './../../CommonTestActions';

// Test actions
function testBody(connect_Page) {
    BaseTest.test.it("Should log in to OneFile with 1File account", () => {
        Common_TestActions.logIn(BaseTest.driver, connect_Page, false);
    });

    BaseTest.test.it("Should move child folder to root level", () => {
        let mails_Page = Common_TestActions.passingPage;
        mails_Page.tutorialSkip();
        mails_Page.moveToRootLevel('Root Folder_', 'Child Folder');
    });

    BaseTest.test.it("Should check that 'Root Folder_' does not contain child folder", () => {
        let mails_Page = Common_TestActions.passingPage;
        return mails_Page.subfolderExistenceCheck(false);
    });

    BaseTest.test.it("Should check that 'Child Folder' moved on root level", () => {
        let mails_Page = Common_TestActions.passingPage;
        return mails_Page.folderExistenceCheck('Child Folder', true);
    });

    BaseTest.test.it("Should move child folder inside 'Root Folder_'", () => {
        let mails_Page = Common_TestActions.passingPage;
        return mails_Page.moveToChildLevel('Child Folder', 'Root Folder_');
    });

    BaseTest.test.it("Should check that child folder moved back", () => {
        let mails_Page = Common_TestActions.passingPage;
        return mails_Page.subfolderExistenceCheck(true);
    });
}

// Initiate test run
BaseTest.testIt("Move child folder to root level and back", testBody);