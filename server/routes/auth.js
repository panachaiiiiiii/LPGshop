const express = require("express");
const router = express.Router();
const {
  PostRegister,
  PostLogin,
  AuthMe,
  EditUser,
  Alluser,
  EditUserEnabled,
  DELuser,
  GetProfile,
  EditUserself,
  EditUserselfPassword,
} = require("../controller/auth");
router.post("/admin/user", PostRegister);
router.post("/Login", PostLogin);
router.get("/check", AuthMe);
router.put("/admin/user/:id", EditUser);
router.delete("/admin/user/:id", DELuser);
router.put("/admin/user/enabled/:id", EditUserEnabled);
router.get("/admin/user", Alluser);
router.get("/profile", GetProfile);
router.put("/profile", EditUserself);
router.put("/profile/password", EditUserselfPassword);
module.exports = router;
