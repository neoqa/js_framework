import BaseTest from '../../../core/webdriver/BaseTest';
import Common_TestActions from './../CommonTestActions';
import Common_PagesActions from './../../../core/webdriver/other/CommonActions';

// Test actions
function testBody(connect_Page) {
    BaseTest.test.it("Should log in to OneFile with 1File account", () => {
        Common_TestActions.logIn(BaseTest.driver, connect_Page, true);
    });

    BaseTest.test.it("Should delete user through profile page", () => {
        let profile_Page = Common_PagesActions.menuNavBy_Link(BaseTest.driver, 'profile');
        Common_TestActions.passingPage = profile_Page.user_Delete();
    });

    BaseTest.test.it("Should check user deletion", () => {
        let welcome_Page =  Common_TestActions.passingPage;
        welcome_Page.pageWait();

        let logIn_Page = welcome_Page.logInPage_Open();
        logIn_Page.pageWait();
        logIn_Page.userDeletion_Check();
    });
}

// Initiate test run
BaseTest.testIt("Delete 1File user through profile page", testBody);