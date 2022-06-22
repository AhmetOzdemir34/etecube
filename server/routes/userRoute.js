const express = require('express');
const router = express.Router();
const userCtrl = require("../controllers/userCtrl");

router.route("/login").post(userCtrl.login); // login
router.route("/register").post(userCtrl.register); // register
router.route("/loggedin").get(userCtrl.loggedin); // loggedin
router.route("/signout").get(userCtrl.signout); // sign-out
router.route("/editprofile").put(userCtrl.editProfile); //edit profile
router.route("/resetpassword").put(userCtrl.resetPassword); //parola degistir
router.route("/teamsofuser").post(userCtrl.teamsOfUser);
module.exports = router;