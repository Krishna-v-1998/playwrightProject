import { test as baseTest } from '@playwright/test';

interface TestDataForOrder {
    email : string;
    password : string;
    productName : string;
}
export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>(
{    
    testDataForOrder:{
    email : "anshika@gmail.com",
    password : "Iamking@000",
    productName : "ADIDAS ORIGINAL"
    }
})