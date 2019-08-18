const puppeteer = require('puppeteer');

const getRecipeName = async url => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const recipesData = await page.evaluate(() => {
        const name = document.querySelector('h1').textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
        const ingredients = [];
        let steps = [];
        let ingredientNodeList;
        let stepsNodeList;
        // grab eatthelove.com ingredients
        if (document.querySelectorAll('span[itemprop="ingredients"]').length !== 0) {
            ingredientNodeList = document.querySelectorAll('span[itemprop="ingredients"]');
        // grab laurainthekitchen.com ingredients and steps
        } else if (document.querySelector('#recipe-ingredients')) {
            ingredientNodeList = document.querySelectorAll('#recipe-ingredients li');
            steps = document.querySelector('#recipe-process ul').textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim().split(/[1-9]\)/);
            // remove empty string at first index
            steps.shift();
            // steps = document.querySelector('#recipe-process ul').textContent.split(/[1-9]\)/);
        // grab cooking.nytimes.com ingredients
        } else if (document.querySelectorAll('li[itemprop="recipeIngredient"]').length !== 0) {
            ingredientNodeList = document.querySelectorAll('li[itemprop="recipeIngredient"]');
        // grab maangchi.com ingredients and steps
        } else {
            const recipeDiv = document.querySelector('.entry.clearfix').children;
            ingredientNodeList = document.querySelectorAll('h4 + ul li');
            stepsNodeList = Array.prototype.slice.call(recipeDiv).slice(12, 18);
            steps = stepsNodeList.map(node => node.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim());
        }
        for (let i = 0; i < ingredientNodeList.length; i++) {
            ingredients.push(ingredientNodeList[i].textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim());
        }
        return { name, ingredients, steps };
    });
    await browser.close();
    return recipesData;
}
module.exports = { getRecipeName };