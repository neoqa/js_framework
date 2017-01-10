import webdriver from 'selenium-webdriver';

// Return driver based on 'm_browser' environment variable
export default function getDriver() {
    return buildDriver();
}

// Drivers
function buildDriver() {
  switch(process.env.m_browser) {
      case 'firefox':
          let firefox = require('selenium-webdriver/firefox');
          let firefoxCap = webdriver.Capabilities.firefox();
          //let firefox_opts =  new firefox.Options();                      // For Selenium 2
          //firefox_opts.setBinary('C:\Program Files\Nightly\firefox.exe'); //
          //firefox_opts.useMarionette(true);                               //

          return new webdriver.Builder().
                     withCapabilities(firefoxCap).
                     //setFirefoxOptions(firefox_opts).
                     build();

      case 'ie':
          let ie = require('selenium-webdriver/ie');
          let ie_Caps = webdriver.Capabilities.ie();
          ie_Caps.set('ignoreZoomSetting', true);
          ie_Caps.set('ie.ensureCleanSession', true);   // Will open new session
          ie_Caps.set('nativeEvents', false);           // Resolve clicking inability issue

          return new webdriver.Builder().
                     withCapabilities(ie_Caps).
                     build();

      default:
          let chrome = require('selenium-webdriver/chrome');
          let chrome_options = new chrome.Options().
                               addArguments("--start-maximized",
                                            "--no-default-browser-check",
                                            "--test-type",
                                            "--disable-extensions");
          chrome_options.setUserPreferences({'profile.default_content_setting_values.notifications': 2});

          return new webdriver.Builder().
                     withCapabilities(webdriver.Capabilities.chrome()).
                     setChromeOptions(chrome_options).
                     build();
  }
}