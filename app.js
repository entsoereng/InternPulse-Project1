const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [];
let currentId = 1;

//Create a new user
app.post('/users', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Namee is required' })
    }
    const newUser = { id: currentId++, name };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Retrieve user information by name
app.get('/users', (req, res) => {
    const { } = req.query;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' })
    }
    const user = users.find(user => user.name === name);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

// Retrieve user information by ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === parseInt(id));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

// Update user information by name
app.put('/users', (req, res) => {
    const { name } = req.query;
    const { newName } = req.body;

    if (!name || !newName) {
        return res.status(400).json({ error: 'Old name and new name are required' })
    }
    user.name = newName;
    res.json(user);
});

// Update user information by ID
app.put('/user/:id', (req, res) => {
    const { id } = req.params;
    const { newName } = req.body;
    if (!newName) {
        return res.status(400).json({ error: 'New name is required' })
    }
    const user = user.find(user => user.id === parseInt(id));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    user.name = newName;
    res.json(user);
});

// Delete a user by name
app.delete('/users', (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    users.splice(userIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(``)
})