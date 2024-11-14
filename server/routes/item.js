const express = require("express");
const router = express.Router();
const {
  showitem,
  remove,
  create,
  showitemadmin,
  updateproduct,
} = require("../controller/item");
router.get("/showitem", showitem);
router.get("/showitem-admin", showitemadmin);
router.delete("/remove/:id", remove);
router.post("/createproduct", create);
router.put("/update-product/:id", updateproduct);
module.exports = router;
