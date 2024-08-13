const functions = require('firebase-functions');
const express = require('express');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2'); // Import the mysql2 package
const cors = require('cors');

const app = express();

const interiorCleaningTime = 1;
const exteriorCleaningTime = 1;
const fullDetailTime = 2;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'your-cloud-host', // Use your cloud SQL host
  user: 'your-username', // Replace with your username
  password: 'your-password', // Replace with your password
  database: 'car_detailing'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

// API endpoint to handle booking submissions
app.post('/book', (req, res) => {
  const { name, email, time, service } = req.body;

  let startTime = new Date(time);
  let endTime = new Date(time);

  if (service === 'Interior Detailing') {
    endTime.setHours(endTime.getHours() + interiorCleaningTime);
  } else if (service === 'Exterior Detailing') {
    endTime.setHours(endTime.getHours() + exteriorCleaningTime);
  } else if (service === 'Full Detailing') {
    endTime.setHours(endTime.getHours() + fullDetailTime);
  }

  const query = 'INSERT INTO bookings (name, email, startTime, endTime, service) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, email, startTime, endTime, service], (err, results) => {
    if (err) {
      console.error('Error saving booking:', err);
      res.status(500).send('Failed to save data');
    } else {
      res.status(200).send('Data saved successfully');
    }
  });
});

// API endpoint to fetch bookings
app.get('/api/bookings', (req, res) => {
  const query = 'SELECT service, startTime, endTime FROM bookings';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      res.status(500).send('Failed to fetch bookings');
      return;
    }

    const bookings = results.map(result => ({
      title: result.service,
      startTime: new Date(result.startTime),
      endTime: new Date(result.endTime)
    }));

    res.json(bookings);
  });
});

// Fallback route to serve the Vue app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

// Export the Express app as a Firebase Function
exports.api = functions.https.onRequest(app);
