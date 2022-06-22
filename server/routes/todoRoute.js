const express = require('express');
const router = express.Router();
const todoCtrl = require('../controllers/todoCtrl');

router.route("/createtodo").post(todoCtrl.createTodo);
router.route("/removetodo/:teamId/:todoId/:id").delete(todoCtrl.removeTodo);
router.route("/edittodo").put(todoCtrl.editTodo);
router.route("/toggleiscompleted").put(todoCtrl.toggleIsCompleted);
router.route("/toggleispublic").put(todoCtrl.toggleIsPublic);
router.route("/filtertodosbyuserid").post(todoCtrl.filterTodosByUserId);

module.exports = router;