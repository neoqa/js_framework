import webdriver from 'selenium-webdriver';


class BasePage {
  constructor(webdriver, url) {
    this.driver = webdriver;
    this.url = url;
  }

  getPage() {
    this.driver.get(this.url);
    return this;
  }

  waitFor(locator) {
    let timeout = 10000;
    let driver = this.driver;
    let until = webdriver.until;
    return driver.wait(until.elementLocated(locator),
                       timeout,
                       'Could not locate element within ' + timeout + 'ms. Element locator: ' + JSON.stringify(locator));
  }

  waitElementToDisappear(elementLocator) {
    let timeout = 15000;
    let driver = this.driver;
    let until = webdriver.until;
    return driver.wait(until.elementIsNotVisible(driver.findElement(elementLocator)),
        timeout,
        'Element disappear waiting error. Wait time: ' + timeout + 'ms. Element locator: ' + JSON.stringify(locator));
  }

  // Simple sleep, where 'sleepTime' in seconds
  sleep(sleepTime){
    let timeout = 1000 * sleepTime;
    this.driver.sleep(timeout);
  }
}

export default BasePage;
