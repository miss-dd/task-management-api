const express = require('express');
const { readTasks, writeTasks } = require('../utils/fileStore');

const router = express.Router();

// Get all tasks
router.get('/', (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
});

// Get one task
router.get('/:id', (req, res) => {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === req.params.id);

    if (!task) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }

    res.json(task);
});

router.post('/', (req, res) => {
    console.log('🔥 POST HIT');

    const tasks = readTasks();

    const newTask = {
        id: Date.now().toString(),
        title: req.body.title,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);

    writeTasks(tasks);

    console.log('✅ TASK SAVED');

    return res.status(201).json(newTask);
});

// Update task
router.put('/:id', (req, res) => {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === req.params.id);

    if (!task) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }

    task.title = req.body.title ?? task.title;
    task.completed = req.body.completed ?? task.completed;

    writeTasks(tasks);

    res.json(task);
});

// Delete task
router.delete('/:id', (req, res) => {
    const tasks = readTasks();
    const index = tasks.findIndex(t => t.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }

    tasks.splice(index, 1);
    writeTasks(tasks);

    res.json({
        message: 'Task deleted'
    });
});

module.exports = router;