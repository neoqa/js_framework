import BaseTest from '../../../../core/webdriver/BaseTest';
import Common_TestActions from './../../CommonTestActions';

// Test actions
function testBody(connect_Page) {
    BaseTest.test.it("Should log in to OneFile with 1File account", () => {
        Common_TestActions.logIn(BaseTest.driver, connect_Page, false);
    });

    BaseTest.test.it('Should delete root folder and undo deletion', () => {
        let mails_Page = Common_TestActions.passingPage;
        mails_Page.tutorialSkip();
        mails_Page.folderDelete('Root Folder_');
        mails_Page.folderDeletionUndo();
    });

    BaseTest.test.it("Should check undo action", () => {
        let mails_Page = Common_TestActions.passingPage;
        return mails_Page.folderExistenceCheck('Root Folder_', true);
    });

    BaseTest.test.it('Should delete root folder', () => {
        let mails_Page = Common_TestActions.passingPage;
        mails_Page.folderDelete('Root Folder_');
    });

    BaseTest.test.it("Should check folder deletion", () => {
        let mails_Page = Common_TestActions.passingPage;
        return mails_Page.folderExistenceCheck('Root Folder_', false);
    });
}

// Initiate test run
BaseTest.testIt("Delete root folder(with 'undo' check)", testBody);