const http = require('http');
const express = require('express')
const app = express();

const controllers = require("./controller/gettingData.controller").data

app.use(express.json())
const server = http.createServer(app);

app.post('/', controllers.sendStockData)

module.exports = server


server.listen(3002, 'localhost', () => {
  console.log(`Server running at http://localhost:3002/`);
});