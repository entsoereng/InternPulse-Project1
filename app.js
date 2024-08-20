require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./userModels');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
}

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

//Create a new user pass:n3VrKsb6ceXyq480 url:
app.post('/users', async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' })
    }
    try {
        const newUser = new User({ name });
        await newUser.save();
        res.status(201).json({ newUser });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ error: 'User already exist' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Retrieve user information by name
app.get('/users', async (req, res) => {
    const { } = req.query;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' })
    }
    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal sever error' });
    }
});

// Retrieve user information by ID
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal sever error' });
    }
});

// Update user information by name
app.put('/users', async (req, res) => {
    const { name } = req.query;
    const { newName } = req.body;

    if (!name || !newName) {
        return res.status(400).json({ error: 'Old name and new name are required' })
    }
    try {
        const user = await User.findOneAndUpdate({ name }, { name: newName }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update user information by ID
app.put('/user/:id', async (req, res) => {
    const { id } = req.params;
    const { newName } = req.body;
    if (!newName) {
        return res.status(400).json({ error: 'New name is required' })
    }
    try {
        const user = await User.findByIdAndUpdate(id, { name: newName }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a user by name
app.delete('/users', async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    try {
        const user = await User.findOneAndDelete({ name });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`User management API running at http://localhost:${PORT}`);
});

module.exports = app;