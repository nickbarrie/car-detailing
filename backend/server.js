const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));


// Serve static files from the public and src directories
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use('/src', express.static(path.join(__dirname, '../frontend/src')));

app.use(express.json());

// API endpoint to handle form submissions
app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    const output = `Name: ${name}, Email: ${email}\n`;

    fs.appendFile(path.join(__dirname, '../backend/submissions.txt'), output, (err) => {
        if (err) {
            res.status(500).send('Failed to save data');
        } else {
            res.status(200).send('Data saved successfully');
        }
    });
});

// Fallback route to serve the Vue app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
});