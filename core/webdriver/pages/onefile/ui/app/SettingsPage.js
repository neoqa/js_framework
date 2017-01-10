import chai from 'chai';
import BasePage from '../../../BasePage';
import getEnvironment from '../../../../../Environments';
import Elements from '../../../../elements/Elements';
import CommonElements from '../../../../elements/CommonElements';
import CustomMethods from './../../../../other/CustomMethods';

export default class SettingsPage extends BasePage {
    constructor(webdriver) {
        super(webdriver, getEnvironment() + "/accounts");
    }

    pageWait() {
        this.waitFor({xpath: '//a[@class="btn" and @href="/connect"]'});
    }

    // Delete email account
    account_Delete(){
        Elements.button(this.driver, {className: 'account-delete'}).click();
        this.waitFor({className: 'popup popup-email-delete'});
        Elements.button(this.driver, CommonElements.simple_Button('Yes, delete email')).click();
        this.pageWait();
    }

    // Check email account deletion
    accountDeletion_Check(){
        this.sleep(3);
        let elementExists = CustomMethods.isElementExists(this.driver, { className: 'account-email'});
        return elementExists.then(exists => {
            chai.assert.equal(exists, false, "Error! Email account deletion isn't working.");
        });
    }
}