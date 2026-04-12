import { loginPage } from './loginPage';
import { dashboardPage } from './dashboardPage'
import {type Page, type Locator} from '@playwright/test'
import { cartPage } from './cartPage';
import { orderDetailsPage } from './orderDetailsPage';
import { paymentOrderPage } from './paymentOrderPage';
export class POManager {

    page: Page;
    LoginPage: loginPage;
    DashboardPage: dashboardPage;
    CartPage: cartPage;
    OrderDetailsPage: orderDetailsPage;
    PaymentOrderPage: paymentOrderPage;


    constructor(page: Page) {
        this.page = page;
        this.LoginPage = new loginPage(this.page);
        this.DashboardPage = new dashboardPage(this.page);
        this.CartPage = new cartPage(this.page);
        this.OrderDetailsPage = new orderDetailsPage(this.page);
        this.PaymentOrderPage = new paymentOrderPage(this.page); 

    }
    
    getLoginPage() {
        return this.LoginPage;
    }

    getDashboardPage() {
        return this.DashboardPage;
    }

    getCartPage() {
        return this.CartPage;
    }

    getOrderDetailsPage() {
        return this.OrderDetailsPage;
    }

    getPaymentOrderPage() {
        return this.PaymentOrderPage;
    }
}

module.exports = {POManager};