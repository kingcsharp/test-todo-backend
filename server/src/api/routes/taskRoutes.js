const express = require('express');
const router = express.Router();
const TaskService = require('../../application/taskService');

// Get /api/tasks
router.get('/', async (req, res) => {
    const tasks = await TaskService.getAllTasks();

    res.json(tasks);
});

// Get /api/tasks/:id
router.get('/:id', async (req, res) => {
    const task = await TaskService.getTaskById(req.params.id);

    if (task) {
        res.json(task);
    } else {
        res.status(404).json({error: 'Task not found'});
    }
});

// Post /api/tasks
router.post('/', async (req, res) => {
    const newTask = await TaskService.createTask(req.body);

    res.status(201).json(newTask);
});

// Put /api/tasks/:id
router.put('/:id', async (req, res) => {
    const updatedTask = await TaskService.updateTask(req.params.id, req.body);

    res.json(updatedTask);
});

// Delete /api/tasks/:id
router.delete('/:id', async (req, res) => {
    await TaskService.deleteTask(req.params.id);

    res.status(204).end();
});

module.exports = router;