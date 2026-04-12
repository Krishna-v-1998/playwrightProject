import { expect, type Page, type Locator } from '@playwright/test';
export class cartPage {
    page: Page;
    itemList: Locator;
    checkout: Locator;
    constructor(page: Page) {
        this.page = page;
        this.itemList = page.locator("div li");
        // this.itemName = page.locator(`h3:has-text('${itemText}')`);
        this.checkout = page.locator("text=Checkout");

    }
    async getProducts(itemText: string) {
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