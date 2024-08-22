const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.post('/', async (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ message: 'User name is required' });
    }

    const user = new User({
        name: req.body.name
    });

    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// Retrieve user information by name
router.get('/', async (req, res) => {
    try {
        const sortBy = req.query.sortBy || 'name';
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;


        if (!['name'].includes(sortBy)) {
            return res.status(400).json({ message: 'Invalid sort field' });
        }

        const users = await User.find().sort({ [sortBy]: sortOrder });

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
});

// Retrieve user information by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error });
    }
});

// Update user information by name
router.put('/', async (req, res) => {
    try {
        const oldName = req.query.oldName;
        const newName = req.body.name;

        if (!oldName || !newName) {
            return res.status(400).json({ message: 'Old name and new name are required' });
        }

        const updatedUser = await User.findOneAndUpdate(
            { name: oldName },
            { name: newName },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});

// Update user information by ID
router.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const newName = req.body.name;

        if (!newName) {
            return res.status(400).json({ message: 'New name is required' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name: newName },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});

// Delete user information by name
router.delete('/', async (req, res) => {
    try {
        const userName = req.query.name;

        if (!userName) {
            return res.status(400).json({ message: 'User name is required' });
        }

        const deletedUser = await User.findOneAndDelete({ name: userName });

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

// Delete user information by ID
router.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

module.exports = router