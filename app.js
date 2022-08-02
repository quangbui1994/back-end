const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('hi')
});

const PORT = 4000 || process.env.PORT;

app.listen(PORT, () => console.log('Running on 4000'));