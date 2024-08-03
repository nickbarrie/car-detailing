const express = require('express');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2'); // Import the mysql2 package

const cors = require('cors');
const { start } = require('repl');
const e = require('express');

const app = express();
const port = 3000;

const interiorCleainingTime = 1;
const exteriorCleaningTime = 1;
const fullDetailTime = 2;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(cors());

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
  const { name, email, date, time, service } = req.body;

  let startTime = new Date(date + 'T' + time);
  let endTime = new Date(date + 'T' + time);
  
  if (service === 'Interior Detailing') {
    endTime.setHours(endTime.getHours() + interiorCleainingTime);
  } else if (service === 'Exterior Detailing') {
    endTime.setHours(endTime.getHours() + exteriorCleaningTime);
  }
  else if (service === 'Full Detailing') {
    endTime.setHours(endTime.getHours() + fullDetailTime);
  }

  const query = 'INSERT INTO bookings (name, email, startTime, endTime, service) VALUES (?, ?, ?, ?, ?)';
  console.log([name, email, startTime, endTime, service]);
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

    // Transform the results into a format suitable for vue-cal
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

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
