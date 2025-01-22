const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

app.use(express.static(path.join(__dirname, '../client/public')));
app.use('/docs', express.static(path.join(__dirname, '../client/docs')));

app.use('/tests', (req, res) => {
  res.redirect(`/docs/tests${req.path}`);
});

app.get('/api/some-endpoint', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
