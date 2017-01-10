export default class CustomMethods {
/*    static get_ProjectPath() {
        // Get mocha path
        let mochaNode_Path = process.argv[1];

        // Cut path, till jump on project level
        for (let i = 0; i != 4; i++) {
            mochaNode_Path = mochaNode_Path.substring(0, mochaNode_Path.lastIndexOf('\\'));
        }
        return mochaNode_Path;
    }*/

    // Switch between drivers
    static driverSwitcher(driver, driverHandles, driverToSwitch) {
        driverHandles.then(function (handles){
            let newWindow = handles[driverToSwitch];
            driver.switchTo().window(newWindow);
        });
        return driver;
    }

    // Define element existence
    static async isElementExists(driver, locator){
        try{
            await driver.findElement(locator);
            return true;
        }
        catch(e){
            return false;
        }
    }
}