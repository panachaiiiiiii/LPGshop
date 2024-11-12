const express = require("express");
const router = express.Router();
const { showitem } = require("../controller/auth");
router.get("/showitemall", showitem);
module.exports = router;
