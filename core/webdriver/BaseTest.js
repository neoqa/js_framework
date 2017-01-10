import test from 'selenium-webdriver/testing';
import getDriver from './DriverMaster';

export default class BaseTest {
    static test = test;
    static driver;
    static testIt(describe, testBody){
        test.describe(describe, function() {

            // Max test time
            this.timeout(120000);

            // Actions before test
            test.before(() => {
                BaseTest.driver = getDriver();
            });

            // Test actions
            testBody();

            // Actions after test
            test.after(() => {
                if (BaseTest.driver)
                    BaseTest.driver.quit();
            });
        });
    }
}