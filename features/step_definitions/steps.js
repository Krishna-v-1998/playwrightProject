// import { Given, When, Then } from '@cucumber/cucumber';
const {When, Then, Given} = require ('@cucumber/cucumber')
const { POManager } = require ('../../pageobject/POManager');
const { expect } = require('@playwright/test'); 
const playwright = require('playwright');  

Given('a Login in {string} and {string}',{timeout: 10000}, async function (username, password) {
//    // const LoginPage = new loginPage(page);
//    const browser = await playwright.chromium.launch({headless: false});
//    const context = await browser.newContext();
//    this.page = await context.newPage();
//    this.poManager = new POManager(this.page);
   const LoginPage = this.poManager.getLoginPage();
   await LoginPage.goTo();
   await LoginPage.validUser(username, password);
});

When('Add {string} to the Cart', async function (productName) {
   const DashboardPage = this.poManager.getDashboardPage(); //new dashboardPage(page);
   await DashboardPage.searchProduct(productName);
   await DashboardPage.navigateTocart();
});

Then('Verify {string} is displayed in the Cart', async function (productName) {
   const CartPage = this.poManager.getCartPage(); 
   // new cartPage(page, expect);
   await CartPage.getProducts(productName);
   await CartPage.productCheckout();
});

When('Enter Valid Details and Place Orders', async function () {
   const PaymentOrderPage = this.poManager.getPaymentOrderPage();
   const country = 'Ind'; // Define the country or get it from test data/context
   const email = 'anshika@gmail.com';
   await PaymentOrderPage.payment(country);
   await PaymentOrderPage.getEmail(email);
   await PaymentOrderPage.placeOrderButton();
});

Then('Verify Order is present in Order Summary', async function () {
   const OrderDetailsPage = this.poManager.getOrderDetailsPage(); //new orderDetailsPage(this.page);
   const orderId = await OrderDetailsPage.getOrderID();
   await OrderDetailsPage.getThanks();
   await OrderDetailsPage.getMyOrders();
   console.log(orderId);

   await this.page.locator("tbody").waitFor();
   const rows = await this.page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = (await this.page.locator(".col-text").textContent() || '').trim();
   expect(orderId && orderIdDetails && orderId.includes(orderIdDetails)).toBeTruthy();
});


Given('a Login to Ecommerce2 application using {string} and {string}', {timeout: 20000}, async function (username, password) {
   const userName = this.page.locator('#username');
   const signIn = this.page.locator('#signInBtn')
   await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   console. log(await this.page.title());
   //css
   await userName.type(username);
   await this.page.locator("[type='password']").type(password);
   await signIn.click();
});

Then('Verify error message is displayed', async function () {
console.log(await this.page.locator("[style*='block']").textContent());
await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});

