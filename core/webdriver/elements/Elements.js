// Return  web element
function get_element (driver, selector) {
    return driver.findElement(selector);
}

// Elements list
export default class Elements {
    static input(driver, selector) {
        return get_element(driver, selector);
    }

    static button(driver, selector) {
        return get_element(driver, selector);
    }

    static text(driver, selector) {
        return get_element(driver, selector);
    }

    static file_input(driver, selector) {
        return get_element(driver, selector);
    }

    static link(driver, selector) {
        return get_element(driver, selector);
    }

    static custom(driver, selector) {
        return get_element(driver, selector);
    }
}