import BasePage from '../../../BasePage';
import Welcome_Page from './../other/WelcomePage';
import getEnvironment from '../../../../../Environments';
import Elements from '../../../../elements/Elements';
import CommonElements from '../../../../elements/CommonElements';

export default class ProfilePage extends BasePage {
    constructor(webdriver) {
        super(webdriver, getEnvironment() + "/profile_page");
    }

    pageWait() {
        this.waitFor({name: 'image'});
    }

    // Delete user
    user_Delete(){
        Elements.button(this.driver, {xpath: '//div[@class="block-user-remove"]//div[contains(@class, "btn") and text()="Delete Account"]'}).click();
        this.waitFor({className: 'popup popup-user-delete'});
        Elements.input(this.driver, {name: 'code'}).sendKeys('DELETE MY ACCOUNT');
        Elements.button(this.driver, CommonElements.simple_Button('Delete account')).click();
        this.sleep(2);
        return new Welcome_Page(this.driver);
    }
}