import chai from 'chai';
import BasePage from '../../../BasePage';
import getEnvironment from '../../../../../Environments';
import Elements from '../../../../elements/Elements';
import Common_Elements from './../../../../elements/CommonElements';
import Custom_Methods from './../../../../other/CustomMethods';

export default class MailsListPage extends BasePage {
    constructor(webdriver) {
        super(webdriver, getEnvironment() + "/inbox/");
    }

    pageWait() {
        this.waitFor({className: 'control-skip'});
    }

    tutorialSkip() {
        Elements.file_input(this.driver, {className: 'control-skip'}).click();
        this.waitFor({className: 'user-name'});
        this.waitFor({xpath: '//div[contains(@class, "folders-item")]'});
    }

    mailSearch(keyword) {
        Elements.file_input(this.driver, {name: 'search'}).sendKeys(keyword);
        this.waitFor({xpath: '//ul[@class="emails"]//span[@class="title"]/b'});
        Elements.file_input(this.driver, {xpath: '//ul[@class="emails"]//span[@class="title"]/b'}).click();
        this.waitFor({xpath: '//div[@class="message-content"]//div[@class="from"]'});
    }

    findedMailCheck(senderEmail, folderName) {
        // Check sender email
        getMailSender(this.driver).then(sender => {
            chai.expect(sender).to.contain(senderEmail);
        });

        // Check service name
        getSelectedFolderName(this.driver).then(folder => {
            chai.expect(folder).to.eql(folderName);
        });
    }

    // Create new root folder
    folderCreate() {
        // Open folder creation pop-up
        Elements.button(this.driver, {xpath: '//div[contains(@class, "btn")]//i[contains(@class, "icon-plus")]'}).click();
        this.waitFor({name: "name"});

        // Check destination
        getFolderDestination(this.driver).then(destination => {
            chai.expect(destination).to.eql('in Automation\'s');
        });

        // Set folder name and save folder
        Elements.input(this.driver, {name: 'name'}).sendKeys('Root Folder');
        Elements.button(this.driver, Common_Elements.simple_Button('Create')).click();
        this.sleep(2);
        this.waitFor({className: "name"});
    }

    // Check root folder existence(by title)
    folderExistenceCheck(folderTitle, expectedCondition) {
        return Custom_Methods.isElementExists(this.driver, {xpath: '//span[@class="name" and @title="' + folderTitle + '"]'}).then(exists => {
            chai.expect(exists).to.eql(expectedCondition);
        });
    }

    // Edit folder title
    folderEdit(folderTitle) {
        // Open 'Edit folder' pop-up
        openFolderOptions(this.driver, folderTitle);
        this.waitFor(Common_Elements.drop_Button('Properties'));
        Elements.button(this.driver, Common_Elements.drop_Button('Properties')).click();

        // Change folder title and save changes
        Elements.input(this.driver, {name: 'name'}).sendKeys('_');
        Elements.button(this.driver, Common_Elements.simple_Button('Save')).click();
        this.sleep(2);
        this.waitFor({className: "name"});
    }

    // Delete folder
    folderDelete(folderTitle) {
        // Delete folder
        openFolderOptions(this.driver, folderTitle);
        this.waitFor(Common_Elements.drop_Button('Delete'));
        Elements.button(this.driver, Common_Elements.drop_Button('Delete')).click();
        this.waitFor({xpath: '//div[@class="undo-holder"]//b[text()="Root Folder_"]'})
    }

    folderDeletionUndo() {
        Elements.button(this.driver, {xpath: '//div[@class="undo-holder"]//span[@class="link" and text()="Undo"]'}).click();
        this.sleep(2);
        this.waitFor({className: "name"});
    }

    // Add child folder
    subfolderCreate(parentFolderTitle) {
        // Open 'Create folder' pop-up
        openFolderOptions(this.driver, parentFolderTitle);
        this.waitFor(Common_Elements.drop_Button('Create Folder'));
        Elements.button(this.driver, Common_Elements.drop_Button('Create Folder')).click();
        this.waitFor({name: "name"});

        // Check destination
        getFolderDestination(this.driver).then(destination => {
            chai.expect(destination).to.eql('in Root Folder_');
        });

        // Set folder name and save folder
        Elements.input(this.driver, {name: 'name'}).sendKeys('Child Folder');
        Elements.button(this.driver, Common_Elements.simple_Button('Create')).click();
        this.sleep(2);
        this.waitFor({className: "name"});
    }

    // Check child folder existence(by title)
    subfolderExistenceCheck(expectedCondition) {
        return Custom_Methods.isElementExists(this.driver, {xpath: '//span[@class="name" and @title="Root Folder_"]/../following-sibling::div//span[@class="name" and @title="Child Folder"]'}).then(exists => {
            chai.expect(exists).to.eql(expectedCondition);
        });
    }

    // Move folder to root level
    moveToRootLevel(parentFolderName, folderName) {
        // Click on parent folder(to see child folder)
        Elements.link(this.driver, {xpath: '//span[@class="name" and @title="' + parentFolderName + '"]'}).click();

        // Open 'Move' pop-up
        openFolderOptions(this.driver, folderName);
        this.waitFor(Common_Elements.drop_Button('Move to...'));
        Elements.button(this.driver, Common_Elements.drop_Button('Move to...')).click();
        this.waitFor({xpath: '//span[@class="name is-root" and text()="Automation\'s"]'});

        // Choose root folder and save
        Elements.custom(this.driver, {xpath: '//span[@class="name is-root" and text()="Automation\'s"]'}).click();
        Elements.button(this.driver, Common_Elements.simple_Button('Move')).click();
        this.sleep(2);
        this.waitFor({className: "name"});
    }

    // Move folder inside another folder
    moveToChildLevel(folderName, destinationFolderName){
        // Open 'Move' pop-up
        openFolderOptions(this.driver, folderName);
        this.waitFor(Common_Elements.drop_Button('Move to...'));
        Elements.button(this.driver, Common_Elements.drop_Button('Move to...')).click();
        this.waitFor({xpath: '//span[@class="name is-root" and text()="Automation\'s"]'});

        // Choose destination folder and save
        Elements.custom(this.driver, {xpath: '//div[@class="popup-body"]//span[@class="name" and text()="'+ destinationFolderName +'"]'}).click();
        Elements.button(this.driver, Common_Elements.simple_Button('Move')).click();
        this.sleep(2);
        this.waitFor({className: "name"});
    }
}

/* _____________________________ Helpers _____________________________ */
function openFolderOptions(driver, folderTitle) {
    driver.actions().click(Elements.link(driver, {xpath: '//span[@class="name" and @title="' + folderTitle + '"]'})).perform();
    driver.sleep(1500);
    driver.actions().click(Elements.button(driver, {xpath: '//span[@class="name" and @title="' + folderTitle + '"]/following-sibling::span/div'})).perform();
}


/* _____________________________ Getters _____________________________ */
// Simple click on mail service
function getSelectedFolderName (driver) {
  return Elements.input(driver, { xpath: '//div[contains(@class, "is-global is-active is-current")]//span[@class="name"]' }).getAttribute('title');
}

// Returns mail author
function getMailSender(driver) {
  return Elements.input(driver, { xpath: '//div[@class="message-content"]//div[@class="from"]' }).getText();
}

// Get destination folder for folder creation pop-up
function getFolderDestination(driver) {
  return Elements.input(driver, { xpath: '//div[@class="folder-location-current"]/span' }).getText();
}
