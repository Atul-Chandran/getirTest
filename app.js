const http = require('http');
const express = require('express')
const app = express();

require('dotenv').config()


const controllers = require("./controller/gettingData.controller").data

app.use(express.json())
const server = http.createServer(app);

app.post('/', controllers.fetchingData)

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}...`);
});

module.exports = server