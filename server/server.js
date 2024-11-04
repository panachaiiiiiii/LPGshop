// backend/server.js
const express = require('express');
const app = express();
const PORT = 5001;
const morgan = require('morgan')
const authRouth = ('./routes/auth')
app.use(express.json())
app.use(morgan('dev'))

app.use('/api',authRouth)

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});