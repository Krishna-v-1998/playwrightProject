const { expect } = require('@playwright/test');
class cartPage {
    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.itemList = page.locator("div li");
        // this.itemName = page.locator(`h3:has-text('${itemText}')`);
        this.checkout = page.locator("text=Checkout");

    }
    async getProducts(itemText) {
        await this.itemList.first().waitFor();
        const itemName = this.page.locator(`h3:has-text('${itemText}')`);
        const bool = await itemName.isVisible();
        expect(bool).toBeTruthy();
    }

    async productCheckout() {
        await this.checkout.click();
    }
}

module.exports = {cartPage};