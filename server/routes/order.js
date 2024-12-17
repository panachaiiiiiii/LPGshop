const express = require("express");
const router = express.Router();
const { OrderProduct, getorder } = require("../controller/order");
router.post("/Order", OrderProduct);
router.get("/GetOrder",getorder)
module.exports = router;
