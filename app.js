const express = require('express');
const app = express();
const { getRecipeName } = require('./middleware/fetch_recipes');

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.get('/recipe', async (req, res) => {
    const data = await getRecipeName(req.query.url);
    console.log('this is data:', data);
    res.send(data);
})