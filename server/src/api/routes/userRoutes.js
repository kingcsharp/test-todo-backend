const express = require('express');
const router = express.Router();
const UserService = require('../../application/userService');

// Get /api/users
router.get('/', async (req, res) => {
    const users = await UserService.getAllUsers();

    res.json(users);
});

// Get /api/users/:id
router.get('/:id', async (req, res) => {
    const user = await UserService.getUserById(req.params.id);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({error: 'User not found'});
    }
});

// Post /api/users
router.post('/', async (req, res) => {
    const newUser = await UserService.createUser(req.body);

    res.status(201).json(newUser);
});

// Put /api/users/:id
router.put('/:id', async (req, res) => {
    const updatedUser = await UserService.updateUser(req.params.id, req.body);

    res.json(updatedUser);
});

// Delete /api/users/:id
router.delete('/:id', async (req, res) => {
    await UserService.deleteUser(req.params.id);

    res.status(204).end();
});

module.exports = router;