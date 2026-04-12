import {type Page, type Locator} from '@playwright/test'
export class loginPage{

    page : Page;
    username: Locator;
    password: Locator;
    loginButton: Locator;
    constructor(page: Page){
        this.page = page;
        this.username = page.locator("#userEmail")//.fill(email);
        this.password = page.locator("#userPassword")//.fill("Iamking@000");
        this.loginButton = page.locator("[value='Login']")//.click();
    }

    async validUser(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client")
    }
}
module.exports = {loginPage};