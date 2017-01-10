//import chai from 'chai';
import BasePage from '../../../BasePage';
import getEnvironment from '../../../../../Environments';
//import Elements from '../../../../elements/Elements';

export default class PlanPage extends BasePage {
    constructor(webdriver) {
        super(webdriver, getEnvironment() + "/upgrade");
    }

    pageWait() {
        this.waitFor({className: 'option'});
    }
}