const express = require('express');
const router = express.Router();
const teamCtrl = require('../controllers/teamCtrl');

router.route("/createteam").post(teamCtrl.createTeam);
router.route("/removeteam/:creatorId/:teamId").delete(teamCtrl.removeTeam);
router.route("/addmember").post(teamCtrl.addMember);
router.route("/removemember/:memberId/:teamId/:id").delete(teamCtrl.removeMember);
router.route("/makeadmin").put(teamCtrl.makeAdmin);

module.exports = router;