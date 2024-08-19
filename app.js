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