import WelcomePage from '../../core/webdriver/pages/onefile/ui/other/WelcomePage';
import FbLogIn_Page from './../../core/webdriver/pages/social_services/facebook/FbLogInPage';
import GmailLogIn_Page from './../../core/webdriver/pages/social_services/google/GmailLogInPage';

// Actions which used frequently in different tests
export default class  CommonItActions {
    // Variable to pass page from this class
    static passingPage;

    // Variables to pass facebook/gmail authentication code
    static fbApiCode;
    static gmailApiCode;

    // LogIn to 1File with 1file account
    static logIn(driver, endPage, toConnectPage) {
        let welcomePage = new WelcomePage(driver);
        welcomePage.getPage();
        welcomePage.pageWait();

        let logInPage = welcomePage.logInPage_Open();
        logInPage.pageWait();

        endPage = logInPage.logIn('Your Login', 'Your password', toConnectPage);
        endPage.pageWait();
        CommonItActions.passingPage = endPage;
    }

    // LogIn to 1File via Facebook
    static logInVia_Fb(driver, endPage, toConnectPage) {
            let welcomePage = new WelcomePage(driver);
            welcomePage.getPage();
            welcomePage.pageWait();

            let logInPage = welcomePage.logInPage_Open();
            logInPage.pageWait();

            let fbLogin_Page = logInPage.logIn_Via_Fb();
            endPage = fbLogin_Page.logIn('Your Login', 'Your password', toConnectPage);
            endPage.pageWait();
            CommonItActions.passingPage = endPage;
    }

    // Will get facebook authentication code and set it in 'fbApiCode' static variable
    static getFb_AuthCode(driver){
        let fbLogin_Page = new FbLogIn_Page(driver);
        fbLogin_Page.getSpecialPage();
        let currentUrl = fbLogin_Page.getCurrentUrl();
        currentUrl.then(url => {
            CommonItActions.fbApiCode = url.substring(url.indexOf('=') + 1, url.lastIndexOf('&'));
        });
    }

    // LogIn to 1File via Gmail
    static logInVia_Gmail(driver, endPage, toConnectPage) {
        let welcomePage = new WelcomePage(driver);
        welcomePage.getPage();
        welcomePage.pageWait();

        let logInPage = welcomePage.logInPage_Open();
        logInPage.pageWait();

        let gmailLogin_Page = logInPage.logIn_Via_Gmail();
        endPage = gmailLogin_Page.logInTo_OneFile('Your Login', 'Your password', toConnectPage, false);
        endPage.pageWait();
        CommonItActions.passingPage = endPage;
    }

    // Will get Gmail authentication code and set it in 'gmailApiCode' static variable
    static getGmail_AuthCode(driver){
        let gmailLogin_Page = new GmailLogIn_Page(driver);
        gmailLogin_Page.getSpecialPage('Aaa123456');
        let currentUrl = gmailLogin_Page.getCurrentUrl();
        currentUrl.then(url => {
            CommonItActions.gmailApiCode = url.substring(url.indexOf('=') + 1, url.lastIndexOf('#'));
        });
    }

    // Search for email
    static email_Search(searchRequest, expectedSender, expectedFolder){
        let mailsPage = CommonItActions.passingPage;
        mailsPage.tutorialSkip();
        mailsPage.mailSearch(searchRequest);
        mailsPage.findedMailCheck(expectedSender, expectedFolder);
    }
}