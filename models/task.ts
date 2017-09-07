const mongoose = require('mongoose');

// Task Schema
const TaskSchema = mongoose.Schema({
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

export const Task = module.exports = mongoose.model('Task', TaskSchema);

module.exports.getAllUserTasks = (userId, callback) => {
    console.log(userId);
    const query = {userId: userId};
    Task.find(query, callback);
}

module.exports.getOneUserTask = (taskId, callback) => {
    const query = {_id: taskId};
    Task.findOne(query, callback);
}

module.exports.addNewTask = (userId, newTask, callback) => {
    let taskToAdd = new Task({
        userId: userId,
        task: newTask,
        isDone: false
    });
    taskToAdd.save(callback);
}

module.exports.deleteTask = (taskId, callback) => {
    Task.remove({_id: taskId}, callback);    
}

module.exports.updateTask = (task, callback) => {
    let updTask = new Task({
        userId: task.userId,
        task: task.task,
        isDone: task.isDone
    });

    Task.update({_id: task._id}, {$set: {userId: updTask.userId, task: updTask.task, isDone: updTask.isDone}}, callback);
}