const {Before, BeforeAll, BeforeStep, After, AfterAll, AfterStep, Status} = require ('@cucumber/cucumber')
const { POManager } = require ('../../pageobject/POManager');
const playwright = require('playwright');  

Before(async function() {
   const browser = await playwright.chromium.launch({headless: false});
   const context = await browser.newContext();
   this.page = await context.newPage();
   this.poManager = new POManager(this.page);

})


After( function() { 
    console.log('After')
})
BeforeStep(function() {
    console.log('BeforeStep')
})
AfterStep(async function({result}) {
    if(result.status === Status.FAILED) {
        await this.page.screenshot({path: 'screenshot9.png'})
    }
})
// AfterStep(async function({result}) {
//     if(result.status === Status.FAILED) {
//         try {
//             await this.page.screenshot({path: 'screenshot9.png'});
//             console.log('Screenshot saved: screenshot9.png');
//         } catch (error) {
//             console.error('Failed to take screenshot:', error.message);
//         }
//     }
// })