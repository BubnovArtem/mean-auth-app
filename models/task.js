"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
exports.config = require('../config/database');
// Task Schema
var TaskSchema = mongoose.Schema({
    userId: {
        type: String
    },
    task: {
        type: String
    },
    isDone: {
        type: Boolean
    }
});
exports.Task = module.exports = mongoose.model('Task', TaskSchema);
module.exports.getAllUserTasks = function (userId, callback) {
    console.log(userId);
    var query = { userId: userId };
    exports.Task.find(query, callback);
};
module.exports.getOneUserTask = function (taskId, callback) {
    var query = { _id: taskId };
    exports.Task.findOne(query, callback);
};
module.exports.addNewTask = function (userId, newTask, callback) {
    var taskToAdd = new exports.Task({
        userId: userId,
        task: newTask,
        isDone: false
    });
    taskToAdd.save(callback);
};
module.exports.deleteTask = function (taskId, callback) {
    exports.Task.remove({ _id: taskId }, callback);
};
module.exports.updateTask = function (task, callback) {
    var updTask = new exports.Task({
        userId: task.userId,
        task: task.task,
        isDone: task.isDone
    });
    exports.Task.update({ _id: task._id }, { $set: { userId: updTask.userId, task: updTask.task, isDone: updTask.isDone } }, callback);
};
//# sourceMappingURL=task.js.map