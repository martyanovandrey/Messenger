const express = require('express');

const app = express();
const PORT = 3000;

const API_PREFIX = '/api/v1';

var path = require('path');
app.use('', express.static(path.join(__dirname, '/static')))

app.get(`${API_PREFIX}/text`, function (req, res) {
    res.status(200).sendFile(__dirname + "/static")
  })

app.listen(PORT, () => {
  console.log(`Мой текст и порт: ${PORT}!`);
});