const {test, expect, request} = require('@playwright/test');

test('Upload and Download Excel', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    await page.locator('.upload').click()
    await page.setInputFiles('C:/Users/My System/Downloads/excelTest1.xlsx');
    await page.pause();
})