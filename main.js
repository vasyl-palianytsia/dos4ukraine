const express = require('express');
const fs = require('fs/promises');

const app = express();

let list_ = [];

let index = '';
fs.readFile('index.html').then((content) => {
  index = content.toString();
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
