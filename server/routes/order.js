const express = require("express");
const router = express.Router();
const {
  OrderProduct,
  getorder,
  getdetailorder,
} = require("../controller/order");
router.post("/Order", OrderProduct);
router.post("/GetOrder", getorder);
router.post("/GetDetailOrder", getdetailorder);
module.exports = router;
