// backend/server.js
const express = require('express');
const app = express();
const PORT = 5001;

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});