const {expect} = require('@playwright/test');
class paymentOrderPage {
    constructor(page) {
        this.page = page;
        this.country = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        // this.optionsCount = this.dropdown.locator("button");
        this.loginUsername = page.locator(".user__name [type='text']");
        this.placeOrder = page.locator(".action__submit")

    }

    async payment(countryName) {
   await this.country.pressSequentially(countryName, { delay: 150 });
   await this.dropdown.waitFor();
   const optionsCount = await this.dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await this.dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await this.dropdown.locator("button").nth(i).click();
         break;
      }
   }
    }

    async getEmail(email) {
        expect(await this.loginUsername.first()).toHaveText(email);
    }

    async placeOrderButton() {
       await this.placeOrder.click();

    }
}

module.exports = {paymentOrderPage};