## Instructions

Clone this repo. `cd` into the project directory. Install dependencies with `npm install` or `yarn`. Start the server by running `yarn dev` or `npm run dev`. Navigate to: ```http://localhost:8080/recipe?url=<url>```

## Technologies Used
- Express
- Puppeteer

## Strategy

I used Express with Node to create an endpoint `/recipe` which accepts a recipe url as a query parameter and returns the recipe data as a `JSON` object. Puppeteer is used in a middleware function to allow for querying the DOM in a headless browser. I used regex matching to break the ingredients into objects.

## Discussion/Challenges

Setting up the endpoint using Node and Express was a simple enough exercise as was setting up puppeteer to scrape the data. For me the most challenging aspect of this project was figuring out how to query the DOM in a way that would be universal enough to work on different pages and robust enough to be prepared for website DOM changes, as the challenge instructions mentions.