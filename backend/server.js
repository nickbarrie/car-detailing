const express = require('express');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2'); // Import the mysql2 package

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the public and src directories
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use('/src', express.static(path.join(__dirname, '../frontend/src')));

// Set up the MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'c@rsBas3', // Replace with your MySQL password
  database: 'car_detailing'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

// API endpoint to handle contact submissions
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

// API endpoint to handle booking submissions
app.post('/book', (req, res) => {
  const { name, email, date, time } = req.body;
  
  const query = 'INSERT INTO bookings (name, email, date, time) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, date, time], (err, results) => {
    if (err) {
      console.error('Error saving booking:', err);
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
  console.log(`Server is running on port ${port}`);
});
