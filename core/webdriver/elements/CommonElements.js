// Selectors for commonly used elements
export default  class CommonElements{
    static simple_Button(buttonName){
        return {xpath: '//button[contains(@class, "btn") and text()="' +buttonName+ '"]'};
    }

    static drop_Button(buttonName){
        return {xpath: '//span[@class="drop-button-action" and text()="' +buttonName+ '"]'};
    }
}