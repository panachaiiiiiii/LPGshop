const express = require("express");
const router = express.Router();
const {
  getallitem,
  removeItem,
  createItem,
  getitemadmin,
  updateproduct,
} = require("../controller/item");
router.get("/showitem", getallitem);
router.get("/showitem-admin", getitemadmin);
router.delete("/remove/:id", removeItem);
router.post("/createproduct", createItem);
router.put("/update-product/:id", updateproduct);
module.exports = router;
