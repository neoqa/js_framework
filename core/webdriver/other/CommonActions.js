import SignIn_Page from '../pages/onefile/ui/other/SignInPage';
import Elements from './../elements/Elements';
import Setting_Page from './../pages/onefile/ui/app/SettingsPage';
import Profile_Page from './../pages/onefile/ui/app/ProfilePage';
import Plan_Page from './../pages/onefile/ui/app/PlanPage';

export default class CommonActions{
    // Go to specific inset(page) by link
    static menuNavBy_Link(driver, insetLink){
        Elements.button(driver, { className: 'burger' }).click();
        driver.sleep(1000);
        Elements.link(driver, { xpath: '//a[@class="main-nav-link" and @href="/' + insetLink + '"]' }).click();

        switch(insetLink){
            case 'accounts':
                return new Setting_Page(driver);
            case 'profile':
                return new Profile_Page(driver);
            case 'upgrade':
                return new Plan_Page(driver);
        }
    }

    static user_Out(driver){
        Elements.button(driver, { className: 'burger' }).click();
        driver.sleep(1000);
        Elements.button(driver, { xpath: '//button[@class="main-nav-link" and text()="Sign Out"]' }).click();
        return new SignIn_Page(driver);
    }
}