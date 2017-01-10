import BaseTest from '../../core/webdriver/BaseTest';

// Pages
import Welcome_Page from '../../core/webdriver/pages/onefile/ui/other/WelcomePage';

// Test actions
function testBody() {
    BaseTest.test.it("Should open welcome page", () => {
        // Log in and go to users page
        let logIn_Page = new Welcome_Page(BaseTest.driver);
        logIn_Page.getPage();
        logIn_Page.pageWait();
    });
}

// Initiate test run
BaseTest.testIt("Welcome page test", testBody);