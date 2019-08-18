const puppeteer = require('puppeteer');

const getRecipeName = async url => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const cookies = await page.goto(url);
    await page.waitForSelector('h1');
    const recipesData = await page.evaluate(() => {
        const name = document.querySelector('h1').textContent;
        return { name };
    });
    await browser.close();
    return recipesData;
}
module.exports = { getRecipeName };