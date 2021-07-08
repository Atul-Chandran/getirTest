const http = require('http');
const express = require('express')
const app = express();

require('dotenv').config()


const controllers = require("./controller/gettingData.controller").data

app.use(express.json())
const server = http.createServer(app);

app.post('/', controllers.sendStockData)

server.listen(process.env.PORT, 'localhost', () => {
  console.log(`Server running at http://localhost:${process.env.port}/`);
});

module.exports = server