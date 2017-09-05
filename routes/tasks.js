"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
exports.Task = require('../models/task');
// Get All User's Tasks
router.get('/', function (req, res, next) {
    var userId = req.headers.user;
    exports.Task.getAllUserTasks(userId, function (err, tasks) {
        if (err)
            throw err;
        if (!userId) {
            return res.json({ success: false, msg: 'Wrong user ID' });
        }
        else {
            return res.json({ success: true, msg: 'Tasks loaded', tasks: tasks });
        }
    });
});
// Get Single User's Task
router.get('/:id', function (req, res, next) {
    var taskId = req.headers.id;
    console.log(taskId);
    exports.Task.getOneUserTask(taskId, function (err, task) {
        if (err)
            throw err;
        if (!taskId) {
            return res.json({ success: false, msg: 'Wrong task ID' });
        }
        else {
            return res.json({ success: true, msg: 'Task loaded', task: task });
        }
    });
});
// Add New Task
router.post('/', function (req, res, next) {
    var userId = req.body.userId;
    var newTask = req.body.task;
    exports.Task.addNewTask(userId, newTask, function (err, task) {
        if (err)
            throw err;
        if (!newTask) {
            return res.json({ success: false, msg: 'Wrong Task data' });
        }
        else {
            return res.json({ success: true, msg: 'Task added', task: task });
        }
    });
});
// Delete Task
router.delete('/:id', function (req, res, next) {
    var taskIdToDelete = req.headers.id;
    console.log('Task to delete ' + taskIdToDelete);
    exports.Task.deleteTask(taskIdToDelete, function (err, task) {
        if (err)
            throw err;
        if (!taskIdToDelete) {
            return res.json({ success: false, msg: 'Deletion error' });
        }
        else {
            return res.json({ success: true, msg: 'Task deleted', task: taskIdToDelete });
        }
    });
});
// Update Task
router.put('/:id', function (req, res, next) {
    var task = req.body.task;
    exports.Task.updateTask(task, function (err, task) {
        if (err)
            throw err;
        return res.json({ success: true, msg: 'Task updated', task: task });
    });
});
module.exports = router;
//# sourceMappingURL=tasks.js.map