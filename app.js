const express = require('express');
const app = express();
const { getRecipeData } = require('./middleware/fetch_recipes');

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.get('/recipe', async (req, res) => {
    const data = await getRecipeData(req.query.url);
    res.send(data);
});

app.use((err, req, res, next) => console.error(err.stack));
