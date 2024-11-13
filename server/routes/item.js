const express = require("express");
const router = express.Router();
const { showitem, remove } = require("../controller/item");
router.get("/showitem", showitem);
router.delete("/remove/:id",remove);
module.exports = router;
