const ExcelJs = require('exceljs');
const {test, expect} =  require('@playwright/test');
    // let order = {
    //     row:-1,
    //     column:-1,
    // }
async function writeExcel() {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile('C:/Users/My System/Downloads/excelTest1.xlsx');
    const worksheet = workbook.getWorksheet('Sheet1');
    const order = await readExcel(worksheet);
    
    const cell = worksheet.getCell(order.row, order.column);
    cell.value = 'Banana'
    await workbook.xlsx.writeFile('C:/Users/My System/Downloads/excelTest1.xlsx')
    console.log(cell.value)

}

async function readExcel(worksheet){
    let order = {
        row:-1,
        column:-1,
    }
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if(cell.value === 'Chips') {
                order.row = rowNumber;
                order.column = colNumber;
            }
        })
    })
    return order
}

writeExcel()




test('Upload and Download Excel', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    await page.locator('#fileinput').click()
    await page.setInputFiles('C:/Users/My System/Downloads/excelTest1.xlsx');
    await page.pause();
})