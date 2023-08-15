const express = require('express');
const app = express();

require('dotenv').config();
const port = process.env.PORT;

app.get('/', (req ,res) => {
    res.send("hello")
})

app.listen((port) => console.log(`app is running at : http://loclahost:${port}`))