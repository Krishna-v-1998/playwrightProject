import { Page, Locator, expect } from '@playwright/test';
export class orderDetailsPage{
    page: Page;
    thankYouText: Locator;
    orderIdLocator: Locator;
    myOrders: Locator;
    constructor(page: Page) {
        this.page = page;
        this.thankYouText = page.locator(".hero-primary");
        this.orderIdLocator = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrders = page.locator("button[routerlink*='myorders']") 
    }

    async getThanks() {
        await expect(this.thankYouText).toHaveText(" Thankyou for the order. ");
        // const orderId = await this.orderIdLocator.textContent();
        // // console.log(orderId);
        // return orderId
    }

    async getOrderID() {
        const orderId = await this.orderIdLocator.textContent();
        // console.log(orderId);
        return orderId
    }
  
    async getMyOrders() {
       await this.myOrders.click();
    }
}




 


module.exports = {orderDetailsPage};