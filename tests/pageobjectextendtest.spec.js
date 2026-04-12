const { test, expect } = require('@playwright/test');
// const { loginPage } = require('../pageobject/loginPage'); 
const { dashboardPage } = require('../pageobject/dashboardPage');
const {cartPage} = require('../pageobject/cartPage');
const {paymentOrderPage} = require('../pageobject/paymentOrderPage');
const {orderDetailsPage} = require('../pageobject/orderDetailsPage');
const {POManager} = require('../pageobject/POManager');
const {customTest} = require('../utils/base-test');

const dataset = JSON.parse(JSON.stringify(require('../utils/test-data.json')));

for(const data of dataset)
{



test(`@PO Client App login for ${data.productName}`, async ({ page }) => {
   //js file- Login js, DashboardPage
   const poManager = new POManager(page);
   // const email = "anshika99819@gmail.com";
   // const password = 'Iamking@000';
   // const productName = 'ZARA COAT 3';
   const country = "ind"

   // const LoginPage = new loginPage(page);
   const LoginPage = poManager.getLoginPage();
   await LoginPage.goTo();
   await LoginPage.validUser(data.email, data.password);

   // await page.waitForLoadState('networkidle');
   const DashboardPage = new dashboardPage(page);
   await DashboardPage.searchProduct(data.productName);
   await DashboardPage.navigateTocart();

   
   const CartPage = new cartPage(page, expect);
   await CartPage.getProducts(data.productName);
   await CartPage.productCheckout();
 

 
   const PaymentOrderPage = new paymentOrderPage(page);
   await PaymentOrderPage.payment(country);
   await PaymentOrderPage.getEmail(data.email);
   await PaymentOrderPage.placeOrderButton();

   await page.pause(); 
   const OrderDetailsPage = new orderDetailsPage(page);
   const orderId = await OrderDetailsPage.getOrderID();
   await OrderDetailsPage.getThanks();
   await OrderDetailsPage.getMyOrders();
   console.log(orderId);

   await page.pause();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
 
});
 
 
 
} 
 

customTest(`@PO Client App login`, async ({ page, testDataForOrder }) => {
   //js file- Login js, DashboardPage
   const poManager = new POManager(page);
   // const email = "anshika99819@gmail.com";
   // const password = 'Iamking@000';
   // const productName = 'ZARA COAT 3';
   const country = "ind"

   // const LoginPage = new loginPage(page);
   const LoginPage = poManager.getLoginPage();
   await LoginPage.goTo();
   await LoginPage.validUser(testDataForOrder.email, testDataForOrder.password);

   // await page.waitForLoadState('networkidle');
   const DashboardPage = new dashboardPage(page);
   await DashboardPage.searchProduct(testDataForOrder.productName);
   await DashboardPage.navigateTocart();

   
   const CartPage = new cartPage(page, expect);
   await CartPage.getProducts(testDataForOrder.productName);
   await CartPage.productCheckout();
 

 
   const PaymentOrderPage = new paymentOrderPage(page);
   await PaymentOrderPage.payment(country);
   await PaymentOrderPage.getEmail(testDataForOrder.email);
   await PaymentOrderPage.placeOrderButton();

   await page.pause(); 
   const OrderDetailsPage = new orderDetailsPage(page);
   const orderId = await OrderDetailsPage.getOrderID();
   await OrderDetailsPage.getThanks();
   await OrderDetailsPage.getMyOrders();
   console.log(orderId);

   await page.pause();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
 
});
 
 
 
 




