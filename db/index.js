const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3308',
  user: 'root',
  password: 'admin',
  database: 'rescuelink'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
  console.log('Connected to the database');
});

// Define a route to handle data submission
app.post('/submit', (req, res) => {
  const { lname, fname, mname, password, birthday, Email, PhoneNumber, Address, AdminID } = req.body;

  // Validation for required fields
  if (!lname || !fname || !mname || !password || !birthday) {
    return res.status(400).send('Last name, First name, Middle Name, Password, and Birthday are required');
  }

  // SQL query with placeholders
  const query = 'INSERT INTO user (LastName, FirstName, MiddleName, Password, Birthday, Email, PhoneNumber, Address, AdminID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

  // Execute query with values array
  connection.query(query, [lname, fname, mname, password, birthday, Email, PhoneNumber, Address, AdminID], (error, results) => {
    if (error) {
      console.error('Database error:', error.message);
      return res.status(500).send('Database error');
    }
    res.status(201).send('Data saved successfully');
  });
});

app.get('/test', (req, res) => {
  res.send('Server is working');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});