const express = require("express");
const router = express.Router();

const { sellitem } = require("../controller/sell");

router.post("/sellproduct", sellitem);
module.exports = router;
