require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

app.all('/api/login', require('./api/login'));
app.all('/api/profile', require('./api/profile'));
app.all('/api/projects', require('./api/projects'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
