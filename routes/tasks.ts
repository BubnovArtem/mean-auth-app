const express: any = require('express');
const router: any = express.Router();
export const Task = require('../models/task');

// Get All User's Tasks
router.get('/', (req, res, next) => {
    const userId = req.headers.user;
    Task.getAllUserTasks(userId, (err, tasks) => {
        if(err) throw err;
        if(!userId) {
            return res.json({success: false, msg: 'Wrong user ID'});
        } else {
            return res.json({success: true, msg:'Tasks loaded', tasks: tasks});
        }
    });
});

// Get Single User's Task
router.get('/:id', (req, res, next) => {
    const taskId = req.headers.id;
    console.log(taskId);
    Task.getOneUserTask(taskId, (err, task) => {
        if(err) throw err;
        if(!taskId) {
            return res.json({success: false, msg: 'Wrong task ID'});
        } else {
            return res.json({success: true, msg:'Task loaded', task: task});
        }
    });
});

// Add New Task
router.post('/', (req, res, next) => {
    const userId = req.body.userId;
    const newTask = req.body.task;
    Task.addNewTask(userId, newTask, (err, task) => {
        if(err) throw err;
        if(!newTask) {
            return res.json({success: false, msg: 'Wrong Task data'});
        } else {
            return res.json({success: true, msg:'Task added', task: task});
        }
    });
});

// Delete Task
router.delete('/:id', (req, res, next) => {
    const taskIdToDelete = req.headers.id;
    console.log('Task to delete ' + taskIdToDelete);
    Task.deleteTask(taskIdToDelete, (err, task) => {
        if(err) throw err;
        if(!taskIdToDelete) {
            return res.json({success: false, msg: 'Deletion error'});
        } else {
            return res.json({success: true, msg:'Task deleted', task: taskIdToDelete});
        }
    });
});

// Update Task
router.put('/:id', (req, res, next) => {
    const task = req.body.task;
    Task.updateTask(task, (err, task) => {
        if(err) throw err;
        return res.json({success: true, msg:'Task updated', task: task});
    });
});

module.exports = router;