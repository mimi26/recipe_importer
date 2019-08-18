const puppeteer = require('puppeteer');

const getRecipeName = async url => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const recipesData = await page.evaluate(() => {
        const name = document.querySelector('h1').textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
        const ingredients = [];
        let ingredientNodeList;
        // grab eatthelove.com ingredients
        if (document.querySelectorAll('span[itemprop="ingredients"]').length !== 0) {
            ingredientNodeList = document.querySelectorAll('span[itemprop="ingredients"]');
        // grab laurainthekitchen.com ingredients
        } else if (document.querySelector('#recipe-ingredients')) {
            ingredientNodeList = document.querySelectorAll('#recipe-ingredients li');
        // grab cooking.nytimes.com ingredients
        } else if (document.querySelectorAll('li[itemprop="recipeIngredient"]').length !== 0) {
            ingredientNodeList = document.querySelectorAll('li[itemprop="recipeIngredient"]');
        }
        for (let i = 0; i < ingredientNodeList.length; i++) {
            ingredients.push(ingredientNodeList[i].textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim());
        }
        return { name, ingredients };
    });
    await browser.close();
    return recipesData;
}
module.exports = { getRecipeName };