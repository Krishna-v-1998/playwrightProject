import {type Page, type Locator} from '@playwright/test'
export class dashboardPage {
    page: Page;
    products: Locator;
    productText: Locator;
    cart: Locator;
    constructor(page: Page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
    }

    async searchProduct(productName: string) {
        // await this.products.first().waitFor();
        const titles = await this.productText.allTextContents();
        console.log(titles); 
        const count = await this.products.count();
        for (let i = 0; i < count; ++i) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                //add to cart
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async navigateTocart() {
        await this.cart.click();
    }
}

module.exports = {dashboardPage};