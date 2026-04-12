const {loginPage} = require('./loginPage');
const { dashboardPage } = require('./dashboardPage');
const {cartPage} = require('./cartPage');
const {paymentOrderPage} = require('./paymentOrderPage');
const {orderDetailsPage} = require('./orderDetailsPage');

class POManager {
    constructor(page) {
        this.page = page;
        this.LoginPage = new loginPage(this.page);
        this.DashboardPage = new dashboardPage(this.page);
        this.CartPage = new cartPage(this.page);
        this.PaymentOrderPage = new paymentOrderPage(this.page);
        this.OrderDetailsPage = new orderDetailsPage(this.page);
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

    getPaymentOrderPage() {
        return this.PaymentOrderPage;
    }

    getOrderDetailsPage() {
        return this.OrderDetailsPage;
    }

}

module.exports = {POManager};