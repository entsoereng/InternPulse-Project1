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