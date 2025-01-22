const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const decryptRoute = require('./routes/decrypt');
const fpRoute = require('./routes/fp');
const analysisRoute = require('./routes/analysis');
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/public')));
app.use('/docs', express.static(path.join(__dirname, '../client/docs')));

app.use('/tests', (req, res) => {
  res.redirect(`/docs/tests${req.path}`);
});

app.get('/api/some-endpoint', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

app.use('/decrypt', decryptRoute);
app.use('/fp', fpRoute);
app.use('/analysis', analysisRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
