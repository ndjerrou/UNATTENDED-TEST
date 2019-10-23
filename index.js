const express = require('express');
const fs = require('fs');

const app = express();

console.log(__dirname);

const playersData = fs.readFileSync(
  `${__dirname}/sample/headtohead.json`,
  'utf-8'
);

const parsedPLayers = JSON.parse(playersData);

app.get('/', (req, res) => {
  res.send('Welcome to the homepage');
});

app.get('/players', (req, res) => {
  parsedPLayers.players.sort((a, b) => {
    return a.id - b.id;
  });
  res.send(parsedPLayers);
});

app.get('/players/:id', (req, res) => {
  const playerWanted = parsedPLayers.players.find(
    player => player.id === parseInt(req.params.id)
  );
  if (playerWanted) {
    res.send(playerWanted);
  } else {
    res.status(404).send('No player found, please check your reference');
  }
});

app.listen(3000);
