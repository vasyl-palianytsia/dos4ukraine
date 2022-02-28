const express = require('express');
const fs = require('fs/promises');

const app = express();

let list_ = [];

let index = '';
fs.readFile('index.html').then((content) => {
  index = content.toString();
});

// Add headers before the routes are defined
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req, res) => {
  res.send(index);
});

app.get('/list', (req, res) => {
  res.send(list_);
});

app.get('/update', updateList);

function updateList(request, response = {
  send: () => 1
}) {
  fs.readFile('list.json').then((content) => {
    list_ = JSON.parse(content);
    list_ = list_.filter((site, i, self) => self.indexOf(site) === i);
    list_=JSON.stringify(list_);
  });
  response.send('OK');
}

app.listen(80);
updateList();
console.log('dos4Ukraine is started');
