// backend/server.js
const express = require("express");
const app = express();
const PORT = 5001;
const morgan = require("morgan");
const cors = require("cors");
const { readdirSync } = require("fs");
// const authRouter = require('./routes/auth')
// const showallitem = require('./routes/showallitem')
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
// app.use('/api',authRouter)
readdirSync("./routes").map((c) => {
  app.use("/api", require("./routes/" + c));
});
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
